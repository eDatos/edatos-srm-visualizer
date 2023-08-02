package es.gobcan.istac.edatos.visualizer.core.repository;

import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class AbstractSrmApiRepository {

    public static final String VERSION = "/v1.0/";

    protected final String urlApiChildrensFromParent;

    public AbstractSrmApiRepository(MetadataConfiguracionService metadataConfiguracionService, String urlApi) {
        this.urlApiChildrensFromParent = metadataConfiguracionService.getStructuralResourcesApi().concat(urlApi);
    }

    protected String getUrlApi(String urn, String urlApi) {
        Urn urnValues = new Urn(urn);
        String agency = urnValues.getAgency();
        String scheme = urnValues.getScheme();
        String version = urnValues.getVersion();

        if(urlApi.contains("#VERSION#")){
            return urlApi.replace("#AGENCY#", agency).replace("#SCHEME#", scheme).replace("#VERSION#", version);
        }

        return urlApi.replace("#AGENCY#", agency).replace("#SCHEME#", scheme);
    }

}
