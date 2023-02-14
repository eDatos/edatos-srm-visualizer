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
public class GenericResource {

    protected final String urlApiChildrensFromParent;
    protected final URNService urnService;

    public GenericResource(String urlApi, URNService urnService) {
        this.urlApiChildrensFromParent = urlApi;
        this.urnService = urnService;
    }

    protected List<TreeNode> loadChildren (String urn, String lang) {
        log.debug("Buscando hijos de " + urn);
        String id = urnService.extractID(urn);
        URI urlApi = URI.create (urlApiChildrensFromParent.replace("#ID#", id));
        RestTemplate restTemplate = new RestTemplate();
        Concepts body = restTemplate.getForEntity(urlApi, Concepts.class).getBody();
        List<TreeNode> conceptsChildren = new ArrayList<>();
        if (body != null && body.getTotal().doubleValue() > 0) {
            for (ItemResource bodyConcept : body.getConcepts()) {
                TreeNode treeNode = new TreeNode(bodyConcept.getUrn(), loadInternationalString(bodyConcept.getName().getTexts(), lang));
                treeNode.getChildren().addAll(loadChildren(treeNode.getUrn(), lang));
                conceptsChildren.add(treeNode);
            }
        }
        return conceptsChildren;
    }

    protected String loadInternationalString(List<LocalisedString> texts, String lang) {
        return texts.stream()
                .filter(element ->
                        element.getLang().equals(lang)
                )
                .findFirst()
                .map(LocalisedString::getValue)
                .orElse("");
    }


}
