package es.gobcan.istac.edatos.visualizer.core.services;


import lombok.extern.slf4j.Slf4j;
import org.siemac.edatos.core.common.exception.CommonServiceExceptionType;
import org.siemac.edatos.core.common.exception.EDatosException;
import org.springframework.stereotype.Service;
import org.siemac.edatos.core.common.util.shared.UrnUtils;

@Slf4j
@Service
public class URNServiceImpl implements URNService {

    public String extractAgency(String urn) {
        String[] splitUrnItem = UrnUtils.splitUrnItem(urn);
        if (splitUrnItem.length >= 1) {
            return splitUrnItem[0];
        }

        throw new EDatosException(CommonServiceExceptionType.PARAMETER_INCORRECT, String.format("El elemento no contiene AGENCY [ %s ]",urn));
    }

    public String extractScheme(String urn) {
        String[] splitUrnItem = UrnUtils.splitUrnItem(urn);
        if (splitUrnItem.length >= 2) {
            return splitUrnItem[1];
        }
        throw new EDatosException(CommonServiceExceptionType.PARAMETER_INCORRECT, String.format("El elemento no contiene SCHEME [ %s ]", urn));
    }

    public String extractVersion(String urn) throws ArrayIndexOutOfBoundsException {
        String[] splitUrnItem = UrnUtils.splitUrnItem(urn);
        if (splitUrnItem.length >= 3) {
            return splitUrnItem[2];
        }
        throw new EDatosException(CommonServiceExceptionType.PARAMETER_INCORRECT, String.format("El elemento no contiene VERSION [ %s ]", urn));
    }

    public String extractID(String urn) {
        String[] splitUrnItem = UrnUtils.splitUrnItem(urn);
        if (splitUrnItem.length == 4) {
            return splitUrnItem[3];
        }
        throw new EDatosException(CommonServiceExceptionType.PARAMETER_INCORRECT, String.format("El elemento no contiene ID [ %s ]", urn));
    }
}
