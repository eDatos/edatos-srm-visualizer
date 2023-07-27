package es.gobcan.istac.edatos.visualizer.rest.resources;

import java.math.BigInteger;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.Concepts;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.ItemResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;
import es.gobcan.istac.edatos.visualizer.utils.JsonUtils;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController()
@RequestMapping("/api/concepts")
public class ConceptsResource extends GenericResource {

    private final String urlApiChildrenDetails;

    @Autowired
    public ConceptsResource(MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/conceptschemes/~all/~all/~latest/concepts?query=PARENT%20eq%20%27#ID#%27"));
        this.urlApiChildrenDetails = metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/conceptschemes/#AGENCY#/#SCHEME#/#VERSION#/concepts");
    }

    @GetMapping("/schemes/{urn}/concepts")
    public String getChildrenFromScheme(@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {
        RestTemplate restTemplate = new RestTemplate();
        Concepts concepts = restTemplate.getForEntity(getUrlApi(urn, urlApiChildrenDetails), Concepts.class).getBody();
        if (concepts != null) {
            List<TreeNode> result = new ArrayList<>();
            for (ItemResource concept : concepts.getConcepts()) {
                TreeNode treeNode = new TreeNode(concept.getUrn(), loadInternationalString(concept.getName().getTexts(), lang));
                treeNode.getChildren().addAll(loadChildren(concept.getUrn(), lang));
                result.add(treeNode);
            }
            return JsonUtils.toJson(result);
        }
        return "";
    }

    @GetMapping("/{urn}/concepts")
    public String getChildren(@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {

        if (!urn.isEmpty()) {
            return JsonUtils.toJson(loadChildren(urn, lang));
        }
        return "";

    }

    protected List<TreeNode> loadChildren(String urn, String lang) {
        log.debug("Search soon {}", urn);
        Urn urnValue = new Urn(urn);
        URI urlApi = URI.create(urlApiChildrensFromParent.replace("#ID#", urnValue.getId()));
        RestTemplate restTemplate = new RestTemplate();
        Concepts body = restTemplate.getForEntity(urlApi, Concepts.class).getBody();
        List<TreeNode> conceptsChildren = new ArrayList<>();
        if (body != null && body.getTotal().compareTo(BigInteger.ZERO) > 0) {
            for (ItemResource bodyConcept : body.getConcepts()) {
                TreeNode treeNode = new TreeNode(bodyConcept.getUrn(), loadInternationalString(bodyConcept.getName().getTexts(), lang));
                treeNode.getChildren().addAll(loadChildren(treeNode.getUrn(), lang));
                conceptsChildren.add(treeNode);
            }
        }
        return conceptsChildren;
    }

}
