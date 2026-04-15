package es.gobcan.istac.edatos.visualizer.core.utils;

import java.util.List;

import org.siemac.metamac.rest.common.v1_0.domain.LocalisedString;

public class InternationalStringUtils {

    private InternationalStringUtils() {}

    public static String loadInternationalString(List<LocalisedString> texts, String lang, String defaultLangValue) {
        String result = "";

        for (LocalisedString e : texts) {
            if (e.getLang().equals(lang)) {
                return e.getValue();
            }
            if (e.getLang().equals(defaultLangValue)) {
                result = e.getValue();
            }
        }
        return result;
    }

}
