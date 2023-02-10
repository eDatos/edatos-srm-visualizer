package es.gobcan.istac.edatos.visualizer.core.services;

public interface URNService {

    public String extractAgency(String urn);

    public String extractScheme(String urn);

    public String extractVersion(String urn);

    public String extractID(String urn);
}
