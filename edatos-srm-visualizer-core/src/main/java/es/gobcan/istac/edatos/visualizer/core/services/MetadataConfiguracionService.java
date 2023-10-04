package es.gobcan.istac.edatos.visualizer.core.services;

import org.siemac.edatos.core.common.conf.ConfigurationService;

public interface MetadataConfiguracionService extends ConfigurationService {


    public String getConfiguracionFooter();

    public String getConfigurationHeader();
    
    public String getAppStyleFaviconUrl();

    public String getStructuralResourcesApi();

    public String getSdmxApi ();

    public String getLanguageCookie ();
}
