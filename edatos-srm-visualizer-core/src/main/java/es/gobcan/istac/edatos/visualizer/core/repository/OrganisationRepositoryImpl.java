package es.gobcan.istac.edatos.visualizer.core.repository;

import java.net.URI;
import java.util.Optional;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.Organisations;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;

@Repository
public class OrganisationRepositoryImpl extends AbstractSrmApiRepository implements OrganisationRepository {

    public static final String ALL_ORGANISATIONS = VERSION + "organisationschemes/~all/~all/~latest/organisations?query=PARENT%20eq%20%27#ID#%27";


    public OrganisationRepositoryImpl(MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService, ALL_ORGANISATIONS);
    }


    public Optional<Organisations> findAllChildren(String urn) {
        Urn urnValue = new Urn(urn);
        URI urlApi = URI.create(urlApiChildrensFromParent.replace("#ID#", urnValue.getId()));
        RestTemplate restTemplate = new RestTemplate();
        Organisations organisations = restTemplate.getForEntity(urlApi, Organisations.class).getBody();
        return Optional.ofNullable(organisations);
    }
}
