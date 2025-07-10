package es.gobcan.istac.edatos.visualizer.core.repository;

import java.util.Optional;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.OrganisationSchemes;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Organisations;
import org.springframework.stereotype.Repository;

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
        Organisations organisations = getForEntity(apiKey, getUrlApi(urn, urlApiChildrenDetails), Organisations.class);

        return Optional.ofNullable(organisations);
    }

    @Override
    public Optional<OrganisationSchemes> findAllVersions(String urn) {
        OrganisationSchemes schemes = getForEntity(apiKey, getUrlApi(urn, urlApiAllVersionsResource), OrganisationSchemes.class);
        return Optional.ofNullable(schemes);
    }
}
