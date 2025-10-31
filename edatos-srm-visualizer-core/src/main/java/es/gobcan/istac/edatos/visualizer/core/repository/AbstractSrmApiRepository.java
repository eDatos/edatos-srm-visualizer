package es.gobcan.istac.edatos.visualizer.core.repository;

import javax.annotation.PostConstruct;

import org.apache.commons.lang.StringUtils;
import org.siemac.edatos.core.common.constants.CoreCommonConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.services.SrmVisualizerConfiguracionService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class AbstractSrmApiRepository {

    private final Logger                      logger           = LoggerFactory.getLogger(AbstractSrmApiRepository.class);
    public static final String                VERSION          = "/v1.0/";
    // TODO: pendiente de confirmar el valor del límite
    public static final String                LIMIT_AND_OFFSET = "?limit=100&offset=0";

    protected final String                    urlApiChildrensFromParent;

    @Autowired
    private SrmVisualizerConfiguracionService configurationService;
    public String                             apiKey;

    public AbstractSrmApiRepository(SrmVisualizerConfiguracionService srmVisualizerConfiguracionService, String urlApi) {
        this.urlApiChildrensFromParent = srmVisualizerConfiguracionService.retrieveSrmExternalApiUrlBase().concat(urlApi);

    }

    @PostConstruct
    public void init() {
        try {
            this.apiKey = configurationService.retrieveSrmVisualizerApiKey();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    protected String getUrlApi(String urn, String urlApi) {
        Urn urnValues = new Urn(urn);
        String agency = urnValues.getAgency();
        String scheme = urnValues.getScheme();
        String version = urnValues.getVersion();

        if (urlApi.contains("#VERSION#")) {
            return urlApi.replace("#AGENCY#", agency).replace("#SCHEME#", scheme).replace("#VERSION#", version);
        }

        return urlApi.replace("#AGENCY#", agency).replace("#SCHEME#", scheme);
    }

    protected <T> T getForEntity(String url, Class<T> responseType) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        if (StringUtils.isNotBlank(apiKey)) {
            headers.set(CoreCommonConstants.API_KEY_PARAMETER, apiKey);
        }
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
        ResponseEntity<T> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, responseType);
        return response.getBody();
    }

}
