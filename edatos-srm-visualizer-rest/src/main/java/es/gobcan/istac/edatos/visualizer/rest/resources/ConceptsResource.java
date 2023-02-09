package es.gobcan.istac.edatos.visualizer.rest.resources;

import com.google.gson.Gson;
import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;
import es.gobcan.istac.edatos.visualizer.core.services.URNService;
import lombok.extern.slf4j.Slf4j;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Concepts;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.ItemResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController()
@RequestMapping("/api/conceptschemes")
public class ConceptsResource extends GenericResource{

    private final String URL_API_SCHEME_CHILDREN;

    @Autowired
    public ConceptsResource(URNService urnService, MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/conceptschemes/~all/~all/~latest/concepts?query=PARENT%20eq%20%27#ID#%27"), urnService);
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
            log.debug(json);
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






}
