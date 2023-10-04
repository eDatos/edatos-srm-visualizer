package es.gobcan.istac.edatos.visualizer.core.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.siemac.metamac.rest.common.v1_0.domain.Resource;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.OrganisationSchemes;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Organisations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.gobcan.istac.edatos.visualizer.core.comparator.VersionDescendentComparator;
import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.repository.OrganisationRepository;
import es.gobcan.istac.edatos.visualizer.core.utils.InternationalStringUtils;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class OrganisationService {

    private final OrganisationRepository organisationRepository;

    @Autowired
    public OrganisationService(OrganisationRepository organisationRepository) {
        this.organisationRepository = organisationRepository;
    }

    public List<TreeNode> findOrganisationsFromScheme(String urn, String lang) {
        List<TreeNode> result = new ArrayList<>();
        Organisations organisations = organisationRepository.findOrganisations(urn).orElse(new Organisations());

        Map<String, TreeNode> organisationToTreeNodeMap = new HashMap<>();


        organisations.getOrganisations().forEach(organisation -> {
            TreeNode treeNode = new TreeNode(organisation.getUrn(), InternationalStringUtils.loadInternationalString(organisation.getName().getTexts(), lang));
            organisationToTreeNodeMap.put(organisation.getUrn(), treeNode);
        });

        organisations.getOrganisations().forEach(organisation -> {
            TreeNode treeNode = organisationToTreeNodeMap.get(organisation.getUrn());

            if (organisation.getParent() != null) {
                TreeNode parentTreeNode = organisationToTreeNodeMap.get(organisation.getParent());
                if (parentTreeNode != null) {
                    parentTreeNode.getChildren().add(treeNode);
                }
            } else {
                result.add(treeNode);
            }
        });

        return result;
    }


    public List<String> loadAllOrganisationVersions(String urn) {
        log.debug("Search soon {}", urn);
        OrganisationSchemes schemes = organisationRepository.findAllVersions(urn).orElse(new OrganisationSchemes());
        List<String> versions = new ArrayList<>();
        for (Resource resource : schemes.getOrganisationSchemes()) {
            Urn urnValues = new Urn(resource.getUrn());
            versions.add(urnValues.getVersion());
        }
        Collections.sort(versions, new VersionDescendentComparator());
        return versions;
    }
}
