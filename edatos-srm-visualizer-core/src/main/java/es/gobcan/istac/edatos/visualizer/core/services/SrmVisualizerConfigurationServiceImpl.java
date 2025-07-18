package es.gobcan.istac.edatos.visualizer.core.services;

import org.siemac.edatos.core.common.conf.ConfigurationServiceImpl;
import org.springframework.stereotype.Service;

import es.gobcan.istac.edatos.visualizer.core.config.SrmVisualizerConfigurationConstants;

@Service
public class SrmVisualizerConfigurationServiceImpl extends ConfigurationServiceImpl implements SrmVisualizerConfiguracionService {

    @Override
    public String retrieveSrmVisualizerApiKey() {
        return retrieveProperty(SrmVisualizerConfigurationConstants.SRM_VISUALIZER_REST_API_KEY);
    }

}
