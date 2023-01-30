package es.gobcan.istac.edatos.visualizer.rest.controllers;

import es.gobcan.istac.edatos.visualizer.core.MetadataConfigurationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/configuration")
public class ConfigurationController {

    @Autowired
    private MetadataConfigurationServiceImpl metadataConfigurationService;

    @GetMapping("/footer-url")
    public String getFooterUrl () {
        return metadataConfigurationService.getConfiguracionFooter();
    }

    @GetMapping("/header-url")
    public String getHeaderUrl () { return metadataConfigurationService.getConfigurationHeader();}

}
