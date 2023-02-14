package es.gobcan.istac.edatos.visualizer.core.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.siemac.edatos.core.common.util.shared.UrnUtils;

@Slf4j
@Service
public class URNServiceImpl implements URNService{

    public String extractAgency(String urn) {
        String[] splitUrnItem = UrnUtils.splitUrnItem(urn);
        if (splitUrnItem.length >= 1) {
            return splitUrnItem[0];
        } else {
            log.debug(" El elemento no contiene Agency " + urn);
        }
        return "";
    }

    public String extractScheme(String urn) {
        String[] splitUrnItem = UrnUtils.splitUrnItem(urn);
        if (splitUrnItem.length >= 2) {
            return splitUrnItem[1];
        } else {
            log.debug(" El elemento no contiene Scheme " + urn);
        }
        return "";
    }

    public String extractVersion(String urn) {
        String[] splitUrnItem = UrnUtils.splitUrnItem(urn);
        if (splitUrnItem.length >= 3) {
            return splitUrnItem[2];
        } else {
            log.debug(" El elemento no contiene VERSION " + urn);
        }
        return "";
    }

    public String extractID(String urn) {
        String[] splitUrnItem = UrnUtils.splitUrnItem(urn);
        if (splitUrnItem.length == 4) {
            return splitUrnItem[3];
        } else {
            log.debug(" El elemento no contiene ID " + urn);
        }
        return "";
    }
}
