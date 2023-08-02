package es.gobcan.istac.edatos.visualizer.core.repository;

import java.net.URI;
import java.util.Optional;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.ConceptSchemes;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Concepts;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;

@Repository
public class ConceptRepositoryImpl extends AbstractSrmApiRepository implements ConceptRepository {

    public static final String ALL_CONCEPTS = VERSION + "conceptschemes/~all/~all/~latest/concepts?query=PARENT%20eq%20%27#ID#%27";
    public static final String CONCEPTS_BY_AGENCY_SCHEME_VERSION = VERSION + "conceptschemes/#AGENCY#/#SCHEME#/#VERSION#/concepts";

    public static final String CONCEPT_SCHEMES_VERSIONS_BY_AGENCY_SCHEME = VERSION + "conceptschemes/#AGENCY#/#SCHEME#";

    private final String urlApiChildrenDetails;

    private final String urlApiAllVersionsResource;

    public ConceptRepositoryImpl(MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService, ALL_CONCEPTS);
        this.urlApiChildrenDetails = metadataConfiguracionService.getStructuralResourcesApi().concat(CONCEPTS_BY_AGENCY_SCHEME_VERSION);
        this.urlApiAllVersionsResource = metadataConfiguracionService.getStructuralResourcesApi().concat(CONCEPT_SCHEMES_VERSIONS_BY_AGENCY_SCHEME);

    }

    public Optional<Concepts> findConcepts(String urn) {
        RestTemplate restTemplate = new RestTemplate();
        Concepts concepts = restTemplate.getForEntity(getUrlApi(urn, urlApiChildrenDetails), Concepts.class).getBody();

        return Optional.ofNullable(concepts);
    }

    public Optional<Concepts> findAllChildren(String urn) {
        Urn urnValue = new Urn(urn);
        URI urlApi = URI.create(urlApiChildrensFromParent.replace("#ID#", urnValue.getId()));
        RestTemplate restTemplate = new RestTemplate();
        Concepts concepts = restTemplate.getForEntity(urlApi, Concepts.class).getBody();
        return Optional.ofNullable(concepts);
    }
    @Override
    public Optional<ConceptSchemes> findAllVersions(String urn) {
        RestTemplate restTemplate = new RestTemplate();
        ConceptSchemes schemes = restTemplate.getForEntity(getUrlApi(urn, urlApiAllVersionsResource), ConceptSchemes.class).getBody();
        return Optional.ofNullable(schemes);
    }
}
