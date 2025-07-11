package es.gobcan.istac.edatos.visualizer.core.repository;

import java.util.Optional;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.ConceptSchemes;
import org.springframework.stereotype.Repository;

import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;

@Repository
public class ConceptRepositoryImpl extends AbstractSrmApiRepository implements ConceptRepository {
    public static final String CONCEPT_SCHEMES_VERSIONS_BY_AGENCY_SCHEME = VERSION + "conceptschemes/#AGENCY#/#SCHEME#";


    private final String urlApiAllVersionsResource;

    public ConceptRepositoryImpl(MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService, CONCEPT_SCHEMES_VERSIONS_BY_AGENCY_SCHEME);
        this.urlApiAllVersionsResource = metadataConfiguracionService.getStructuralResourcesApi().concat(CONCEPT_SCHEMES_VERSIONS_BY_AGENCY_SCHEME);
    }

    @Override
    public Optional<ConceptSchemes> findAllVersions(String urn) {
        ConceptSchemes schemes = getForEntity(getUrlApi(urn, urlApiAllVersionsResource), ConceptSchemes.class);
        return Optional.ofNullable(schemes);
    }
}
