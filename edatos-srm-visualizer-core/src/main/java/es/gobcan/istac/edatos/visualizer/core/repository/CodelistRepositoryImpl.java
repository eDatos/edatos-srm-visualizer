package es.gobcan.istac.edatos.visualizer.core.repository;

import java.net.URI;
import java.util.Optional;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.Codelists;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Codes;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;

@Repository public class CodelistRepositoryImpl extends AbstractSrmApiRepository implements CodelistRepository {

    public static final String ALL_LATEST_CODES_URL                   = VERSION + "codelists/~all/~all/~latest/codes?query=PARENT%20eq%20%27#ID#%27";
    public static final String CODES_BY_AGENCY_SCHEME_VERSION_URL     = VERSION + "codelists/#AGENCY#/#SCHEME#/#VERSION#/codes";
    public static final String CODELISTS_BY_AGENCY_SCHEME_VERSION_URL = VERSION + "codelists/#AGENCY#/#SCHEME#";

    private final String urlApiChildrenDetails;
    private final String urlApiAllVersionsResource;

    public CodelistRepositoryImpl(MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService, ALL_LATEST_CODES_URL);
        this.urlApiChildrenDetails = metadataConfiguracionService.getStructuralResourcesApi().concat(CODES_BY_AGENCY_SCHEME_VERSION_URL);
        this.urlApiAllVersionsResource = metadataConfiguracionService.getStructuralResourcesApi().concat(CODELISTS_BY_AGENCY_SCHEME_VERSION_URL);

    }

    @Override
    public Optional<Codes> findCodelist(String urn) {
        RestTemplate restTemplate = new RestTemplate();
        Codes codes = restTemplate.getForEntity(getUrlApi(urn, urlApiChildrenDetails), Codes.class).getBody();

        return Optional.ofNullable(codes);
    }

    @Override
    public Optional<Codes> findAllChildren(String urn) {
        Urn urnValue = new Urn(urn);
        URI urlApi = URI.create(urlApiChildrensFromParent.replace("#ID#", urnValue.getId()));
        RestTemplate restTemplate = new RestTemplate();
        Codes codes = restTemplate.getForEntity(urlApi, Codes.class).getBody();
        return Optional.ofNullable(codes);
    }
    @Override
    public Optional<Codelists> findAllVersions(String urn) {
        RestTemplate restTemplate = new RestTemplate();
        Codelists codelists = restTemplate.getForEntity(getUrlApi(urn, urlApiAllVersionsResource), Codelists.class).getBody();
        return Optional.ofNullable(codelists);
    }
}
