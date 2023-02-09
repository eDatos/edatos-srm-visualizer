package es.gobcan.istac.edatos.visualizer.core.services;

import org.springframework.stereotype.Service;
import org.siemac.edatos.core.common.conf.ConfigurationServiceImpl;
@Service
public class MetadataConfigurationServiceImpl extends ConfigurationServiceImpl implements MetadataConfiguracionService{

    @Override
    public String getConfiguracionFooter() {
        return retrieveAppStyleFooterUrl();
    }

    @Override
    public String getConfigurationHeader() {
        return retrieveAppStyleHeaderUrl ();
    }

    @Override
    public String getStructuralResourcesApi() {
        return retrieveSrmExternalApiUrlBase ();
    }

    @Override
    public String getSdmxApi () { return retrieveSdmxSrmExternalApiUrlBase();}

}
