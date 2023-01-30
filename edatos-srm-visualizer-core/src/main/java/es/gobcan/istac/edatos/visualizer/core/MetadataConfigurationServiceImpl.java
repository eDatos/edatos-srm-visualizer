package es.gobcan.istac.edatos.visualizer.core;

import org.springframework.stereotype.Service;
import org.siemac.edatos.core.common.conf.ConfigurationServiceImpl;
@Service
public class MetadataConfigurationServiceImpl extends ConfigurationServiceImpl implements MetadataConfiguracionService{

    @Override
    public String getConfiguracionFooter() {
        return retrieveProperty("metamac.app.style.footer.url");
    }

    @Override
    public String getConfigurationHeader() {
        return retrieveProperty("metamac.app.style.header.url");
    }



}
