package es.gobcan.istac.edatos.visualizer.core.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.siemac.edatos.core.common.conf.ConfigurationService;
import org.siemac.metamac.rest.common.v1_0.domain.Resource;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Codelists;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Codes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.gobcan.istac.edatos.visualizer.core.comparator.VersionDescendentComparator;
import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.repository.CodelistRepository;
import es.gobcan.istac.edatos.visualizer.core.utils.InternationalStringUtils;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CodelistService {

    private final CodelistRepository   codeListRepository;

    private final ConfigurationService configurationService;
    private String                     languageDefault;

    @Autowired
    public CodelistService(CodelistRepository codeListRepository, ConfigurationService configurationService) {
        this.codeListRepository = codeListRepository;
        this.configurationService = configurationService;
        this.languageDefault = this.configurationService.retrieveLanguageDefault();
    }

    public List<TreeNode> findCodelistFromScheme(String urn, String lang) {
        List<TreeNode> result = new ArrayList<>();
        Codes codes = codeListRepository.findCodelist(urn).orElse(new Codes());

        Map<String, TreeNode> codeToTreeNodeMap = new HashMap<>();

        codes.getCodes().forEach(code -> {
            TreeNode treeNode = new TreeNode(code.getUrn(), InternationalStringUtils.loadInternationalString(code.getName().getTexts(), lang, languageDefault));
            codeToTreeNodeMap.put(code.getUrn(), treeNode);
        });

        codes.getCodes().forEach(code -> {
            TreeNode treeNode = codeToTreeNodeMap.get(code.getUrn());

            if (code.getParent() != null) {
                TreeNode parentTreeNode = codeToTreeNodeMap.get(code.getParent());
                if (parentTreeNode != null) {
                    parentTreeNode.getChildren().add(treeNode);
                }
            } else {
                result.add(treeNode);
            }
        });

        return result;
    }

    public List<String> loadAllCodelistVersions(String urn) {
        log.debug("Search soon {}", urn);
        Codelists codelists = codeListRepository.findAllVersions(urn).orElse(new Codelists());
        List<String> versions = new ArrayList<>();
        for (Resource resource : codelists.getCodelists()) {
            Urn urnValues = new Urn(resource.getUrn());
            versions.add(urnValues.getVersion());
        }
        Collections.sort(versions, new VersionDescendentComparator());
        return versions;
    }

}
