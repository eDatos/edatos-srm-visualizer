package es.gobcan.istac.edatos.visualizer.core.repository;

import java.util.Optional;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.Codelists;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Codes;
import org.springframework.stereotype.Repository;

import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;

@Repository
public class CodelistRepositoryImpl extends AbstractSrmApiRepository implements CodelistRepository {

    public static final String CODES_BY_AGENCY_SCHEME_VERSION_URL     = VERSION + "codelists/#AGENCY#/#SCHEME#/#VERSION#/codes";
    public static final String CODELISTS_BY_AGENCY_SCHEME_VERSION_URL = VERSION + "codelists/#AGENCY#/#SCHEME#";

    private final String urlApiChildrenDetails;
    private final String urlApiAllVersionsResource;

    public CodelistRepositoryImpl(MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService, CODES_BY_AGENCY_SCHEME_VERSION_URL);
        this.urlApiChildrenDetails = metadataConfiguracionService.getStructuralResourcesApi().concat(CODES_BY_AGENCY_SCHEME_VERSION_URL);
        this.urlApiAllVersionsResource = metadataConfiguracionService.getStructuralResourcesApi().concat(CODELISTS_BY_AGENCY_SCHEME_VERSION_URL);

    }

    @Override
    public Optional<Codes> findCodelist(String urn) {
        Codes codes = getForEntity(getUrlApi(urn, urlApiChildrenDetails), Codes.class);

        return Optional.ofNullable(codes);
    }

    @Override
    public Optional<Codelists> findAllVersions(String urn) {
        Codelists codelists = getForEntity(getUrlApi(urn, urlApiAllVersionsResource), Codelists.class);
        return Optional.ofNullable(codelists);
    }
}
