package es.gobcan.istac.edatos.visualizer.core.repository;

import java.net.URI;
import java.util.Optional;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.Categories;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.CategorySchemes;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;

@Repository
public class CategoryRepositoryImpl extends AbstractSrmApiRepository implements CategoryRepository {

    public static final String ALL_LATEST_CATEGORIES_URL               = VERSION + "categoryschemes/~all/~all/~latest/categories?query=PARENT%20eq%20%27#ID#%27";
    public static final String CATEGORIES_BY_AGENCY_SCHEME_VERSION_URL = VERSION + "categoryschemes/#AGENCY#/#SCHEME#/#VERSION#/categories";
    public static final String CATEGORY_SCHEME_BY_AGENCY_SCHEME_VERSION_URL = VERSION + "categoryschemes/#AGENCY#/#SCHEME#";

    private final String urlApiChildrenDetails;
    private final String urlApiAllVersionsResource;

    public CategoryRepositoryImpl(MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService, ALL_LATEST_CATEGORIES_URL);
        this.urlApiChildrenDetails = metadataConfiguracionService.getStructuralResourcesApi().concat(CATEGORIES_BY_AGENCY_SCHEME_VERSION_URL);
        this.urlApiAllVersionsResource = metadataConfiguracionService.getStructuralResourcesApi().concat(CATEGORY_SCHEME_BY_AGENCY_SCHEME_VERSION_URL);

    }

    @Override
    public Optional<Categories> findCategories(String urn) {
        RestTemplate restTemplate = new RestTemplate();
        Categories categories = restTemplate.getForEntity(getUrlApi(urn, urlApiChildrenDetails), Categories.class).getBody();

        return Optional.ofNullable(categories);
    }

    @Override
    public Optional<Categories> findAllChildren(String urn) {
        Urn urnValue = new Urn(urn);
        URI urlApi = URI.create(urlApiChildrensFromParent.replace("#ID#", urnValue.getId()));
        RestTemplate restTemplate = new RestTemplate();
        Categories categories = restTemplate.getForEntity(urlApi, Categories.class).getBody();
        return Optional.ofNullable(categories);
    }
    @Override
    public Optional<CategorySchemes> findAllVersions(String urn) {
        RestTemplate restTemplate = new RestTemplate();
        CategorySchemes schemes = restTemplate.getForEntity(getUrlApi(urn, urlApiAllVersionsResource), CategorySchemes.class).getBody();
        return Optional.ofNullable(schemes);
    }
}
