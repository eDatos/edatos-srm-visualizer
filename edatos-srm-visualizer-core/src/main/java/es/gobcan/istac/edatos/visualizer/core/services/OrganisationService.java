package es.gobcan.istac.edatos.visualizer.core.services;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.ItemResource;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Organisations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
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

    public List<TreeNode> loadChildren(String urn, String lang) {
        log.debug("Search soon {}", urn);
        Organisations organisations = organisationRepository.findAllChildren(urn).orElse(new Organisations());
        List<TreeNode> organisationChildren = new ArrayList<>();
        if (organisations.getTotal().compareTo(BigInteger.ZERO) > 0) {
            for (ItemResource bodyConcept : organisations.getOrganisations()) {
                TreeNode treeNode = new TreeNode(bodyConcept.getUrn(), InternationalStringUtils.loadInternationalString(bodyConcept.getName().getTexts(), lang));
                treeNode.getChildren().addAll(loadChildren(treeNode.getUrn(), lang));
                organisationChildren.add(treeNode);
            }
        }
        return organisationChildren;
    }

}
