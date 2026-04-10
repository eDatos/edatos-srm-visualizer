package es.gobcan.istac.edatos.visualizer.core.utils;

import java.util.List;

import org.siemac.metamac.rest.common.v1_0.domain.LocalisedString;

public class InternationalStringUtils {

    private InternationalStringUtils() {}

    public static String loadInternationalString(List<LocalisedString> texts, String lang, String defaultLangValue) {
        return texts.stream()
                .filter(element ->
                    element.getLang().equals(lang)
                )
                .map(LocalisedString::getValue)
                .findFirst()
                .orElseGet(() ->
                    texts.stream().filter(element -> 
                        element.getLang().equals(defaultLangValue)
                    )
                    .map(LocalisedString::getValue)
                    .findFirst()
                    .orElse("")
                );
    }

}
