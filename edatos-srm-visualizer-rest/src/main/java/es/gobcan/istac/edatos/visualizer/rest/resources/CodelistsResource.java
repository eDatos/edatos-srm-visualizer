package es.gobcan.istac.edatos.visualizer.rest.resources;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.siemac.metamac.rest.common.v1_0.domain.Resource;
import org.siemac.metamac.rest.common.v1_0.domain.Resources;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Codelist;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Codelists;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Codes;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Concepts;
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
    private final String urlApiAllVersionsResource;

    @Autowired
    public CodelistsResource(MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/codelists/~all/~all/~latest/codes?query=PARENT%20eq%20%27#ID#%27"));
        this.urlApiChildrenDetails = metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/codelists/#AGENCY#/#SCHEME#/#VERSION#/codes");
        this.urlApiAllVersionsResource = metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/codelists/#AGENCY#/#SCHEME#");
    }

    @GetMapping("/{urn}/all-versions")
    public String getAllVersionsFromResource(@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {
        RestTemplate restTemplate = new RestTemplate();
        Codelists codelists = restTemplate.getForEntity(getUrlApi(urn, urlApiAllVersionsResource), Codelists.class).getBody();
        if (codelists != null) {
            List<String> result = new ArrayList<>();
            for (Resource resource : codelists.getCodelists()) {
                Urn urnValues = new Urn(resource.getUrn());
                result.add(urnValues.getVersion());
            }
            Gson gson = new Gson();
            String json = gson.toJson(result);
            log.debug(json);
            return json;
        }
        return "";
    }

    @GetMapping("/codelists/{urn}/codes")
    public String getChildrenFromScheme(@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {
        RestTemplate restTemplate = new RestTemplate();
        Codes codes = restTemplate.getForEntity(getUrlApi(urn, urlApiChildrenDetails), Codes.class).getBody();
        if (codes != null) {
            List<TreeNode> result = new ArrayList<>();
            for (ItemResource code : codes.getCodes()) {
                TreeNode treeNode = new TreeNode(code.getUrn(), loadInternationalString(code.getName().getTexts(), lang));
                treeNode.getChildren().addAll(loadChildren(code.getUrn(), lang));
                result.add(treeNode);
            }
            Gson gson = new Gson();
            String json = gson.toJson(result);
            log.debug(json);
            return json;
        }
        return "";
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
