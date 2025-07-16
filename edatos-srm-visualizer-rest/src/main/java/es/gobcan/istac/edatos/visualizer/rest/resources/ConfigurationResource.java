package es.gobcan.istac.edatos.visualizer.rest.resources;

import org.siemac.edatos.core.common.conf.ConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.gobcan.istac.edatos.visualizer.core.services.SrmVisualizerConfiguracionService;

@RestController
@RequestMapping("/api/configuration")
public class ConfigurationResource {

    @Autowired
    private SrmVisualizerConfiguracionService srmVisualizerConfigurationService;

    @Autowired
    private ConfigurationService              configurationService;

    @GetMapping("/footer-url")
    public String getFooterUrl() {
        return configurationService.retrieveAppStyleFooterUrl();
    }

    @GetMapping("/header-url")
    public String getHeaderUrl() {
        return configurationService.retrieveAppStyleHeaderUrl();
    }

    @GetMapping("/favicon-url")
    public String getFaviconUrl() {
        return configurationService.retrieveAppStyleFaviconUrl();
    }

    @GetMapping("/structural-resource-api")
    public String getStructuralResourceAPI() {
        return configurationService.retrieveSrmExternalApiUrlBase();
    }

    @GetMapping("/sdmx-api")
    public String getSdmxApi() {
        return configurationService.retrieveSdmxRegistryExternalApiUrlBase();
    }

    @GetMapping("/language-cookie")
    public String getLanguageCookie() {
        return configurationService.retrieveInternationalizationCookieId();
    }

    @GetMapping("/api-key")
    public String getApiKey() {
        return srmVisualizerConfigurationService.retrieveSrmVisualizerApiKey();
    }

}
