package es.gobcan.istac.edatos.visualizer.core;

import org.springframework.stereotype.Service;

@Service
public class URNServiceImpl implements URNService{

    public String extractAgency(String urn) {
        return urn.split("=")[1].split(":")[0];
    }

    public String extractScheme(String urn) {
        return urn.split("=")[1].split(":")[1].split("\\(")[0];
    }

    public String extractVersion(String urn) {
        return urn.split("=")[1].split("\\(")[1].split("\\)")[0];
    }

    public String extractID(String urn) {
        return urn.split("=")[1].split("\\)")[1].replace(".","");
    }
}
