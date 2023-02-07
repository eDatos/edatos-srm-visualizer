package es.gobcan.istac.edatos.visualizer.core;

import org.siemac.edatos.core.common.conf.ConfigurationService;

public interface MetadataConfiguracionService extends ConfigurationService {


    public String getConfiguracionFooter();

    public String getConfigurationHeader();

    public String getStructuralResourcesApi();
}
