package es.gobcan.istac.edatos.visualizer.rest.resources;

import java.util.List;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;

import es.gobcan.istac.edatos.visualizer.core.services.CategoryService;

import es.gobcan.istac.edatos.visualizer.utils.JsonUtils;
import lombok.extern.slf4j.Slf4j;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController()
@RequestMapping("/api/categories")
public class CategoriesResource {

    private final CategoryService categoryService;

    @Autowired
    public CategoriesResource(CategoryService categoryService) {
       this.categoryService = categoryService;
    }

    @GetMapping("/{urn}/all-versions")
    public String getAllVersionsFromResource(@PathVariable("urn") String urn) {
        List<String> versions = categoryService.loadAllCategorySchemeVersions(urn);
        return versions.isEmpty()? "" : JsonUtils.toJson(versions);
    }

    @GetMapping("/schemes/{urn}/categories")
    public String getChildrenFromScheme(@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {
        List<TreeNode> treeNodes = categoryService.findCategoriesFromScheme(urn, lang);
        return treeNodes.isEmpty()? "" : JsonUtils.toJson(treeNodes);
    }

    @GetMapping("/{urn}/categories")
    public String getChildren(@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {
        if (!urn.isEmpty()) {
            return JsonUtils.toJson(categoryService.loadChildren(urn, lang));
        }
        return "";
    }
}
