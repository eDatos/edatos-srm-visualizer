package es.gobcan.istac.edatos.visualizer.rest.resources;

import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/configuration")
public class ConfigurationResource {

    @Autowired
    private MetadataConfiguracionService metadataConfigurationService;

    @GetMapping("/footer-url")
    public String getFooterUrl () {
        return metadataConfigurationService.getConfiguracionFooter();
    }

    @GetMapping("/header-url")
    public String getHeaderUrl () { return metadataConfigurationService.getConfigurationHeader();}

    @GetMapping("/structural-resource-api")
    public String getStructuralResourceAPI () { return metadataConfigurationService.getStructuralResourcesApi();}

    @GetMapping("/sdmx-api")
    public String getSdmxApi () { return metadataConfigurationService.getSdmxApi();}

    @GetMapping("/language-cookie")
    public String getLnaguageCookie () { return metadataConfigurationService.getLanguageCookie();}

}
