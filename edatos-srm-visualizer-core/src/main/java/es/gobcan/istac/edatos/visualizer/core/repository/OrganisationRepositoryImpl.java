package es.gobcan.istac.edatos.visualizer.core.repository;

import java.util.Optional;


import org.siemac.metamac.rest.structural_resources.v1_0.domain.OrganisationSchemes;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Organisations;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;

@Repository
public class OrganisationRepositoryImpl extends AbstractSrmApiRepository implements OrganisationRepository {

    public static final String ORGANISATIONS_BY_AGENCY_SCHEME_VERSION_URL = VERSION + "organisationschemes/#AGENCY#/#SCHEME#/#VERSION#/organisations";
    public static final String ORGANISATIONS_SCHEME_VERSIONS_URL = VERSION + "organisationschemes/#AGENCY#/#SCHEME#";

    private final String urlApiChildrenDetails;
    private final String urlApiAllVersionsResource;

    public OrganisationRepositoryImpl(MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService, ORGANISATIONS_BY_AGENCY_SCHEME_VERSION_URL);
        this.urlApiChildrenDetails = metadataConfiguracionService.getStructuralResourcesApi().concat(ORGANISATIONS_BY_AGENCY_SCHEME_VERSION_URL);
        this.urlApiAllVersionsResource = metadataConfiguracionService.getStructuralResourcesApi().concat(ORGANISATIONS_SCHEME_VERSIONS_URL);

    }

    @Override
    public Optional<Organisations> findOrganisations(String urn) {
        RestTemplate restTemplate = new RestTemplate();
        Organisations organisations = restTemplate.getForEntity(getUrlApi(urn, urlApiChildrenDetails), Organisations.class).getBody();

        return Optional.ofNullable(organisations);
    }

    @Override
    public Optional<OrganisationSchemes> findAllVersions(String urn) {
        RestTemplate restTemplate = new RestTemplate();
        OrganisationSchemes schemes = restTemplate.getForEntity(getUrlApi(urn, urlApiAllVersionsResource), OrganisationSchemes.class).getBody();
        return Optional.ofNullable(schemes);
    }
}
