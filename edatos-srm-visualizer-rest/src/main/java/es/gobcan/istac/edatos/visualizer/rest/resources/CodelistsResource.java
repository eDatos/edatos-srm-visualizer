package es.gobcan.istac.edatos.visualizer.rest.resources;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.services.CodelistService;
import es.gobcan.istac.edatos.visualizer.utils.JsonUtils;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController()
@RequestMapping("/api/codelists")
public class CodelistsResource{

    private final CodelistService codelistService;

    @Autowired
    public CodelistsResource(CodelistService codelistService) {
       this.codelistService = codelistService;
    }

    @GetMapping("/{urn}/all-versions")
    public String getAllVersionsFromResource(@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {
        List<String> versions = codelistService.loadAllCodelistVersions(urn);
        return versions.isEmpty()? "" : JsonUtils.toJson(versions);
    }

    @GetMapping("/codelists/{urn}/codes")
    public String getChildrenFromScheme(@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {
        List<TreeNode> treeNodes = codelistService.findCodelistFromScheme(urn, lang);
        return treeNodes.isEmpty()? "" : JsonUtils.toJson(treeNodes);
    }

    @GetMapping("/{urn}/codes")
    public String getChildren(@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {
        if (!urn.isEmpty()) {
            return JsonUtils.toJson(codelistService.loadChildren(urn, lang));
        }
        return "";
    }

}
