package es.gobcan.istac.edatos.visualizer.core.services;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.siemac.metamac.rest.common.v1_0.domain.Resource;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Codelists;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Codes;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.ItemResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.gobcan.istac.edatos.visualizer.core.comparator.VersionDescendentComparator;
import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.repository.CodelistRepository;
import es.gobcan.istac.edatos.visualizer.core.utils.InternationalStringUtils;
import lombok.extern.slf4j.Slf4j;

@Service @Slf4j public class CodelistService {

    private final CodelistRepository codeListRepository;

    @Autowired
    public CodelistService(CodelistRepository codeListRepository) {
        this.codeListRepository = codeListRepository;
    }

    public List<TreeNode> findCodelistFromScheme(String urn, String lang) {
        List<TreeNode> result = new ArrayList<>();
        Codes codes = codeListRepository.findCodelist(urn).orElse(new Codes());
        codes.getCodes().forEach(code -> {
            TreeNode treeNode = new TreeNode(code.getUrn(), InternationalStringUtils.loadInternationalString(code.getName().getTexts(), lang));
            treeNode.getChildren().addAll(loadChildren(code.getUrn(), lang));
            result.add(treeNode);
        });
        return result;
    }

    public List<TreeNode> loadChildren(String urn, String lang) {
        log.debug("Search soon {}", urn);
        Codes codes = codeListRepository.findAllChildren(urn).orElse(new Codes());
        List<TreeNode> categoriesChildren = new ArrayList<>();
        if (codes.getTotal().compareTo(BigInteger.ZERO) > 0) {
            for (ItemResource code : codes.getCodes()) {
                TreeNode treeNode = new TreeNode(code.getUrn(), InternationalStringUtils.loadInternationalString(code.getName().getTexts(), lang));
                treeNode.getChildren().addAll(loadChildren(treeNode.getUrn(), lang));
                categoriesChildren.add(treeNode);
            }
        }
        return categoriesChildren;
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
