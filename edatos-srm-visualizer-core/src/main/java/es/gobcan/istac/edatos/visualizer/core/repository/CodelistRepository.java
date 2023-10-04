package es.gobcan.istac.edatos.visualizer.core.repository;

import java.util.Optional;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.Categories;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.CategorySchemes;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Codelists;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Codes;

public interface CodelistRepository {

    Optional<Codes> findCodelist(String urn);
    Optional<Codelists> findAllVersions(String urn);

}
