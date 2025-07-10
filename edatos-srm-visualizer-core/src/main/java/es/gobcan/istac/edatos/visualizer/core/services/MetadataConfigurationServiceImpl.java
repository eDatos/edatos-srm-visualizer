package es.gobcan.istac.edatos.visualizer.core.services;

import org.siemac.edatos.core.common.conf.ConfigurationServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class MetadataConfigurationServiceImpl extends ConfigurationServiceImpl implements MetadataConfiguracionService {

    @Override
    public String getConfiguracionFooter() {
        return retrieveAppStyleFooterUrl();
    }

    @Override
    public String getConfigurationHeader() {
        return retrieveAppStyleHeaderUrl();
    }

    @Override
    public String getStructuralResourcesApi() {
        return retrieveSrmExternalApiUrlBase();
    }

    @Override
    public String getSdmxApi() {
        return retrieveSdmxRegistryExternalApiUrlBase();
    }

    @Override
    public String getLanguageCookie() {
        return retrieveInternationalizationCookieId();
    }

    @Override
    public String getSrmVisualizerApiKey() {
        return retrieveSrmVisualizerApiKey();
    }

}
