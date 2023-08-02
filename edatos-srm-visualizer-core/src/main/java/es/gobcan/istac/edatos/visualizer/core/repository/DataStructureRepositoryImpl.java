package es.gobcan.istac.edatos.visualizer.core.repository;

import java.net.URI;
import java.util.Optional;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.Categories;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.CategorySchemes;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.DataStructures;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;

@Repository
public class DataStructureRepositoryImpl extends AbstractSrmApiRepository implements DataStructureRepository {

    public static final String CATEGORY_SCHEME_BY_AGENCY_SCHEME_VERSION_URL = VERSION + "datastructures/#AGENCY#/#SCHEME#";


    public DataStructureRepositoryImpl(MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService, CATEGORY_SCHEME_BY_AGENCY_SCHEME_VERSION_URL);
    }

    @Override
    public Optional<DataStructures> findAllVersions(String urn) {
        RestTemplate restTemplate = new RestTemplate();
        DataStructures schemes = restTemplate.getForEntity(getUrlApi(urn, urlApiChildrensFromParent), DataStructures.class).getBody();
        return Optional.ofNullable(schemes);
    }
}
