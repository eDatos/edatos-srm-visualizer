package es.gobcan.istac.edatos.visualizer.core.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.siemac.metamac.rest.common.v1_0.domain.Resource;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.ConceptSchemes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.gobcan.istac.edatos.visualizer.core.comparator.VersionDescendentComparator;
import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.repository.ConceptRepository;
import lombok.extern.slf4j.Slf4j;

@Service @Slf4j public class ConceptService {

    private final ConceptRepository conceptRepository;

    @Autowired
    public ConceptService(ConceptRepository conceptRepository) {
        this.conceptRepository = conceptRepository;
    }

    public List<String> loadAllConceptsSchemeVersions(String urn) {
        log.debug("Search soon {}", urn);
        ConceptSchemes conceptSchemes = conceptRepository.findAllVersions(urn).orElse(new ConceptSchemes());
        List<String> versions = new ArrayList<>();
        for (Resource resource : conceptSchemes.getConceptSchemes()) {
            Urn urnValues = new Urn(resource.getUrn());
            versions.add(urnValues.getVersion());
        }
        Collections.sort(versions, new VersionDescendentComparator());
        return versions;
    }

}
