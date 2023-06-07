package es.gobcan.istac.edatos.visualizer.rest.resources;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import lombok.extern.slf4j.Slf4j;
import org.siemac.metamac.rest.common.v1_0.domain.LocalisedString;

import java.util.List;

@Slf4j
public abstract class GenericResource {

    protected final String urlApiChildrensFromParent;
    public GenericResource(String urlApi) {
        this.urlApiChildrensFromParent = urlApi;
    }

    protected abstract List<TreeNode> loadChildren (String urn, String lang);
    protected String loadInternationalString(List<LocalisedString> texts, String lang) {
        return texts.stream()
                .filter(element ->
                        element.getLang().equals(lang)
                )
                .findFirst()
                .map(LocalisedString::getValue)
                .orElse("");
    }

    protected String getUrlApi(String urn, String urlApiChildrenDetails) {
        Urn urnValues = new Urn(urn);
        String agency = urnValues.getAgency();
        String scheme = urnValues.getScheme();
        String version = urnValues.getVersion();

        return urlApiChildrenDetails.replace("#AGENCY#", agency).replace("#SCHEME#", scheme).replace("#VERSION#", version);
    }

}
