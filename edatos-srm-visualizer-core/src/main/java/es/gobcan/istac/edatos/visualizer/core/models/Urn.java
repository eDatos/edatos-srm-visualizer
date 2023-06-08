package es.gobcan.istac.edatos.visualizer.core.models;

import org.siemac.edatos.core.common.util.shared.UrnUtils;
public class Urn {

    private final String agency;
    private final String scheme;
    private final String version;
    private final String id;

    public Urn(String urn) {
        String[] splitUrnItem = UrnUtils.splitUrnItem(urn);
        this.agency = splitUrnItem[0];
        this.scheme = splitUrnItem[1];
        this.version = splitUrnItem[2];
        this.id = splitUrnItem[3];
    }

    public String getAgency() {
        return agency;
    }
    public String getScheme() {
        return scheme;
    }
    public String getVersion() {
        return version;
    }
    public String getId() {
        return id;
    }
}
