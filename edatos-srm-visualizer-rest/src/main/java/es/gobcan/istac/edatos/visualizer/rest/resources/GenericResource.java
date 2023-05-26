package es.gobcan.istac.edatos.visualizer.rest.resources;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.services.URNService;
import lombok.extern.slf4j.Slf4j;
import org.siemac.metamac.rest.common.v1_0.domain.LocalisedString;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Concepts;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.ItemResource;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Slf4j
public abstract class GenericResource {

    protected final String urlApiChildrensFromParent;
    protected final URNService urnService;
    public GenericResource(String urlApi, URNService urnService) {
        this.urlApiChildrensFromParent = urlApi;
        this.urnService = urnService;
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
        String agency = urnService.extractAgency(urn);
        String scheme = urnService.extractScheme(urn);
        String version = urnService.extractVersion(urn);

        return urlApiChildrenDetails.replace("#AGENCY#", agency).replace("#SCHEME#", scheme).replace("#VERSION#", version);
    }

}
