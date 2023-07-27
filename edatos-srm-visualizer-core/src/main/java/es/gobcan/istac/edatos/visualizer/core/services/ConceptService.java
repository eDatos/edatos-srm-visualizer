package es.gobcan.istac.edatos.visualizer.core.services;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.Concepts;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.ItemResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.repository.ConceptRepository;
import es.gobcan.istac.edatos.visualizer.core.utils.InternationalStringUtils;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ConceptService {

    private final ConceptRepository conceptRepository;

   @Autowired
    public ConceptService(ConceptRepository conceptRepository) {
       this.conceptRepository = conceptRepository;
    }

    public List<TreeNode> findConceptsFromScheme(String urn, String lang) {
        List<TreeNode> result = new ArrayList<>();
        Concepts concepts = conceptRepository.findConcepts(urn).orElse(new Concepts());
        concepts.getConcepts().forEach(concept -> {
            TreeNode treeNode = new TreeNode(concept.getUrn(), InternationalStringUtils.loadInternationalString(concept.getName().getTexts(), lang));
            treeNode.getChildren().addAll(loadChildren(concept.getUrn(), lang));
            result.add(treeNode);
        });
        return result;
    }

    public List<TreeNode> loadChildren(String urn, String lang) {
        log.debug("Search soon {}", urn);
        Concepts concepts = conceptRepository.findAllChildren(urn).orElse(new Concepts());
        List<TreeNode> conceptsChildren = new ArrayList<>();
        if (concepts.getTotal().compareTo(BigInteger.ZERO) > 0) {
            for (ItemResource bodyConcept : concepts.getConcepts()) {
                TreeNode treeNode = new TreeNode(bodyConcept.getUrn(), InternationalStringUtils.loadInternationalString(bodyConcept.getName().getTexts(), lang));
                treeNode.getChildren().addAll(loadChildren(treeNode.getUrn(), lang));
                conceptsChildren.add(treeNode);
            }
        }
        return conceptsChildren;
    }

}
