package es.gobcan.istac.edatos.visualizer.core.repository;

import java.util.Optional;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.ConceptSchemes;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Concepts;

public interface ConceptRepository {

    Optional<Concepts> findConcepts(String urn);
    Optional<Concepts> findAllChildren(String urn);

    Optional<ConceptSchemes> findAllVersions(String urn);

}
