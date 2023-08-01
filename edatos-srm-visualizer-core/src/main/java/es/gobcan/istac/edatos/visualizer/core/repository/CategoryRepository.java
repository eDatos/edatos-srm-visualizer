package es.gobcan.istac.edatos.visualizer.core.repository;

import java.util.Optional;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.Categories;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.CategorySchemes;

public interface CategoryRepository {

    Optional<Categories> findCategories(String urn);
    Optional<Categories> findAllChildren(String urn);

    Optional<CategorySchemes> findAllVersions(String urn);

}
