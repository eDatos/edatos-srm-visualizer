package es.gobcan.istac.edatos.visualizer.rest.resources;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.Codes;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.ItemResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;
import lombok.extern.slf4j.Slf4j;

@Slf4j @RestController() @RequestMapping("/api/codelists") public class CodelistsResource extends GenericResource {

    private final String urlApiChildrenDetails;

    @Autowired
    public CodelistsResource(MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/codelists/~all/~all/~latest/codes?query=PARENT%20eq%20%27#ID#%27"));
        this.urlApiChildrenDetails = metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/codelists/#AGENCY#/#SCHEME#/#VERSION#/codes");
    }

    @GetMapping("/{urn}/codes")
    public String getChildren(@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {
        if (!urn.isEmpty()) {
            Gson gson = new Gson();
            return gson.toJson(loadChildren(urn, lang));
        }
        return "";
    }

    protected List<TreeNode> loadChildren(String urn, String lang) {
        log.debug("Search soon {}", urn);
        Urn urnValue = new Urn(urn);
        URI urlApi = URI.create(urlApiChildrensFromParent.replace("#ID#", urnValue.getId()));
        RestTemplate restTemplate = new RestTemplate();
        Codes body = restTemplate.getForEntity(urlApi, Codes.class).getBody();
        List<TreeNode> codesChildren = new ArrayList<>();
        if (body != null && body.getTotal().doubleValue() > 0) {
            for (ItemResource code : body.getCodes()) {
                TreeNode treeNode = new TreeNode(code.getUrn(), loadInternationalString(code.getName().getTexts(), lang));
                treeNode.getChildren().addAll(loadChildren(treeNode.getUrn(), lang));
                codesChildren.add(treeNode);
            }
        }
        return codesChildren;
    }
}
