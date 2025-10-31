package es.gobcan.istac.edatos.visualizer.core.repository;

import java.util.Optional;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.Categories;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.CategorySchemes;
import org.springframework.stereotype.Repository;

import es.gobcan.istac.edatos.visualizer.core.services.SrmVisualizerConfiguracionService;

@Repository
public class CategoryRepositoryImpl extends AbstractSrmApiRepository implements CategoryRepository {

    public static final String CATEGORIES_BY_AGENCY_SCHEME_VERSION_URL      = VERSION + "categoryschemes/#AGENCY#/#SCHEME#/#VERSION#/categories";
    public static final String CATEGORY_SCHEME_BY_AGENCY_SCHEME_VERSION_URL = VERSION + "categoryschemes/#AGENCY#/#SCHEME#" + LIMIT_AND_OFFSET;

    private final String urlApiChildrenDetails;
    private final String urlApiAllVersionsResource;

    public CategoryRepositoryImpl(SrmVisualizerConfiguracionService srmVisualizerConfiguracionService) {
        super(srmVisualizerConfiguracionService, CATEGORIES_BY_AGENCY_SCHEME_VERSION_URL);
        this.urlApiChildrenDetails = srmVisualizerConfiguracionService.retrieveSrmExternalApiUrlBase().concat(CATEGORIES_BY_AGENCY_SCHEME_VERSION_URL);
        this.urlApiAllVersionsResource = srmVisualizerConfiguracionService.retrieveSrmExternalApiUrlBase().concat(CATEGORY_SCHEME_BY_AGENCY_SCHEME_VERSION_URL);

    }

    @Override
    public Optional<Categories> findCategories(String urn) {
        Categories categories = getForEntity(getUrlApi(urn, urlApiChildrenDetails), Categories.class);

        return Optional.ofNullable(categories);
    }

    @Override
    public Optional<CategorySchemes> findAllVersions(String urn) {
        CategorySchemes schemes = getForEntity(getUrlApi(urn, urlApiAllVersionsResource), CategorySchemes.class);
        return Optional.ofNullable(schemes);
    }
}
