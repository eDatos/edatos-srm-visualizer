package es.gobcan.istac.edatos.visualizer.core.repository;

import java.util.Optional;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.DataStructures;
import org.springframework.stereotype.Repository;

import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;

@Repository
public class DataStructureRepositoryImpl extends AbstractSrmApiRepository implements DataStructureRepository {

    public static final String CATEGORY_SCHEME_BY_AGENCY_SCHEME_VERSION_URL = VERSION + "datastructures/#AGENCY#/#SCHEME#";


    public DataStructureRepositoryImpl(MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService, CATEGORY_SCHEME_BY_AGENCY_SCHEME_VERSION_URL);
    }

    @Override
    public Optional<DataStructures> findAllVersions(String urn) {
        DataStructures schemes = getForEntity(getUrlApi(urn, urlApiChildrensFromParent), DataStructures.class);
        return Optional.ofNullable(schemes);
    }
}
