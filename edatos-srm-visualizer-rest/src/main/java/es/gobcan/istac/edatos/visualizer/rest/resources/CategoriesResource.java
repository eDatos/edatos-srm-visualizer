package es.gobcan.istac.edatos.visualizer.rest.resources;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;
import es.gobcan.istac.edatos.visualizer.core.services.URNService;
import lombok.extern.slf4j.Slf4j;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.Categories;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.ItemResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;

@Slf4j
@RestController()
@RequestMapping("/api/categories")
public class CategoriesResource extends GenericResource {

    private final String urlApiChildrens;

    @Autowired
    public CategoriesResource(URNService urnService, MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/categoryschemes/~all/~all/~latest/categories?query=PARENT%20eq%20%27#ID#%27"), urnService);
        this.urlApiChildrens = metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/categoryschemes/#AGENCY#/#SCHEME#/#VERSION#/categories");
    }

    @GetMapping("/{urn}/categories")
    public String getChildrensFromCategories (@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {
        RestTemplate restTemplate = new RestTemplate();
        Categories categories = restTemplate.getForEntity(getUrlApi(urn, urlApiChildrens), Categories.class).getBody();
        if (categories != null) {
            List<TreeNode> result = new ArrayList<>();
            for (ItemResource category : categories.getCategories()) {
                TreeNode treeNode = new TreeNode(category.getUrn(), loadInternationalString(category.getName().getTexts(), lang));
                treeNode.getChildren().addAll(loadChildren(category.getUrn(), lang));
                result.add(treeNode);
            }
            Gson gson = new Gson();
            String json = gson.toJson(result);
            log.debug(json);
            return json;
        }
        return "";
    }

    @Override
    protected List<TreeNode> loadChildren(String urn, String lang) {
        log.debug("Search soon {}", urn);
        String id = urnService.extractID(urn);
        URI urlApi = URI.create (urlApiChildrensFromParent.replace("#ID#", id));
        RestTemplate restTemplate = new RestTemplate();
        Categories body = restTemplate.getForEntity(urlApi, Categories.class).getBody();
        List<TreeNode> categoriesChildren = new ArrayList<>();
        if (body != null && body.getTotal().doubleValue() > 0) {
            for (ItemResource bodyCategory : body.getCategories()) {
                TreeNode treeNode = new TreeNode(bodyCategory.getUrn(), loadInternationalString(bodyCategory.getName().getTexts(), lang));
                treeNode.getChildren().addAll(loadChildren(treeNode.getUrn(), lang));
                categoriesChildren.add(treeNode);
            }
        }
        return categoriesChildren;
    }
}
