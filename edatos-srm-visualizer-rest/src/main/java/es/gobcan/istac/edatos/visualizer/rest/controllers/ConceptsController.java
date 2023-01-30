package es.gobcan.istac.edatos.visualizer.rest.controllers;

import com.google.gson.Gson;
import org.siemac.metamac.rest.common.v1_0.domain.LocalisedString;
import org.siemac.metamac.rest.structural_resources_internal.v1_0.domain.ItemResourceInternal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.siemac.metamac.rest.structural_resources_internal.v1_0.domain.Concepts;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController()
@RequestMapping("/api/concepts")
public class ConceptsController {

    //private String URL_API_CHILDREN = "https://estadisticas.arte-consultores.com/structural-resources/v1.0/conceptschemes/~all/~all/~latest/concepts?limit=100&offset=0&query=PARENT%20eq%20%27#ID#%27";
    private String URL_API_CHILDREN = "http://localhost:8080/structural-resources/v1.0/conceptschemes/~all/~all/~latest/concepts?limit=100&offset=0&query=PARENT%20eq%20%27#ID#%27";


    @GetMapping("/{urn}")
    public String getChildren (@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {

        if (!urn.isEmpty()) {
            Gson gson = new Gson();
            return gson.toJson(loadChildren(urn, lang));
        }
        return "";

    }

    private List<TreeNode> loadChildren (String urn, String lang) {
        System.out.println("Buscando hijos de " + urn);
        String id = getIdFromURN(urn);
        URI urlApi = URI.create (URL_API_CHILDREN.replace("#ID#", id));
        RestTemplate restTemplate = new RestTemplate();
        Concepts body = restTemplate.getForEntity(urlApi, Concepts.class).getBody();
        List<TreeNode> conceptsChildren = new ArrayList<>();
        if (body.getTotal().doubleValue() > 0) {
            for (ItemResourceInternal bodyConcept : body.getConcepts()) {
                TreeNode treeNode = new TreeNode(bodyConcept.getUrn(), loadInternationalString(bodyConcept.getName().getTexts(), lang));
                treeNode.children.addAll(loadChildren(treeNode.urn, lang));
                conceptsChildren.add(treeNode);
            }
        }
        return conceptsChildren;
    }

    private String getIdFromURN (String urn) {
        System.out.println("URN " + urn);
        return urn.split("=")[1].split("\\)")[1].replace(".","");
    }

    private String loadInternationalString(List<LocalisedString> texts, String lang) {
        return texts.stream()
                .filter(element ->
                        element.getLang().equals(lang)
                )
                .findFirst()
                .map(element -> element.getValue())
                .orElse("");
    }


}
