package es.gobcan.istac.edatos.visualizer.core.services;

import org.siemac.edatos.core.common.conf.ConfigurationService;

public interface SrmVisualizerConfiguracionService extends ConfigurationService {

    public String retrieveSrmVisualizerApiKey();
}
