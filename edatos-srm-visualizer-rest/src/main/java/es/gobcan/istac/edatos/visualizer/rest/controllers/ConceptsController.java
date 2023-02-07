package es.gobcan.istac.edatos.visualizer.rest.controllers;

import com.google.gson.Gson;
import es.gobcan.istac.edatos.visualizer.core.MetadataConfiguracionService;
import es.gobcan.istac.edatos.visualizer.core.URNService;
import org.siemac.metamac.rest.common.v1_0.domain.LocalisedString;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Concepts;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.ItemResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController()
@RequestMapping("/api/conceptschemes")
public class ConceptsController {

    private final URNService urnService;

    private final String URL_API_CHILDREN;
    private final String URL_API_SCHEME_CHILDREN;


    @Autowired
    public ConceptsController(URNService urnService, MetadataConfiguracionService metadataConfiguracionService) {
        this.urnService = urnService;
        this.URL_API_CHILDREN = metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/conceptschemes/~all/~all/~latest/concepts?query=PARENT%20eq%20%27#ID#%27");
        this.URL_API_SCHEME_CHILDREN = metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/conceptschemes/#AGENCY#/#SCHEME#/#VERSION#/concepts");
    }





    @GetMapping("/schemes/{urn}/concepts")
    public String getChildrenFromScheme (@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {
        String agency = urnService.extractAgency(urn);
        String scheme = urnService.extractScheme(urn);
        String version = urnService.extractVersion(urn);

        String urlApi = URL_API_SCHEME_CHILDREN.replace("#AGENCY#", agency).replace("#SCHEME#", scheme).replace("#VERSION#", version);
        RestTemplate restTemplate = new RestTemplate();
        Concepts concepts = restTemplate.getForEntity(urlApi, Concepts.class).getBody();
        if (concepts != null) {
            List<TreeNode> result = new ArrayList<>();
            for (ItemResource concept : concepts.getConcepts()) {
                TreeNode treeNode = new TreeNode(concept.getUrn(), loadInternationalString(concept.getName().getTexts(), lang));
                treeNode.getChildren().addAll(loadChildren(concept.getUrn(), lang));
                result.add(treeNode);
            }
            Gson gson = new Gson();
            String json = gson.toJson(result);
            System.out.println(json);
            return json;
        }
        return "";
    }
    @GetMapping("/{urn}/concepts")
    public String getChildren (@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {

        if (!urn.isEmpty()) {
            Gson gson = new Gson();
            return gson.toJson(loadChildren(urn, lang));
        }
        return "";

    }

    private List<TreeNode> loadChildren (String urn, String lang) {
        System.out.println("Buscando hijos de " + urn);

        String id = urnService.extractID(urn);
        URI urlApi = URI.create (URL_API_CHILDREN.replace("#ID#", id));
        RestTemplate restTemplate = new RestTemplate();
        Concepts body = restTemplate.getForEntity(urlApi, Concepts.class).getBody();
        List<TreeNode> conceptsChildren = new ArrayList<>();
        if (body != null && body.getTotal().doubleValue() > 0) {
            for (ItemResource bodyConcept : body.getConcepts()) {
                TreeNode treeNode = new TreeNode(bodyConcept.getUrn(), loadInternationalString(bodyConcept.getName().getTexts(), lang));
                treeNode.children.addAll(loadChildren(treeNode.urn, lang));
                conceptsChildren.add(treeNode);
            }
        }
        return conceptsChildren;
    }


    private String loadInternationalString(List<LocalisedString> texts, String lang) {
        return texts.stream()
                .filter(element ->
                        element.getLang().equals(lang)
                )
                .findFirst()
                .map(LocalisedString::getValue)
                .orElse("");
    }


}
