package es.gobcan.istac.edatos.visualizer.rest.resources;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.services.ConceptService;
import es.gobcan.istac.edatos.visualizer.utils.JsonUtils;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController()
@RequestMapping("/api/concepts")
public class ConceptsResource  {
    private final ConceptService conceptService;
    @Autowired
    public ConceptsResource(ConceptService conceptService) {
        this.conceptService = conceptService;
    }

    @GetMapping("/{urn}/all-versions")
    public String getAllVersionsFromResource(@PathVariable("urn") String urn) {
        List<String> versions = conceptService.loadAllConceptsSchemeVersions(urn);
        return versions.isEmpty()? "" : JsonUtils.toJson(versions);
    }


    @GetMapping("/schemes/{urn}/concepts")
    public String getChildrenFromScheme(@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {
        List<TreeNode> result = conceptService.findConceptsFromScheme(urn, lang);
        return result.isEmpty()? "" : JsonUtils.toJson(result);
    }

    @GetMapping("/{urn}/concepts")
    public String getChildren(@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {

        if (!urn.isEmpty()) {
            return JsonUtils.toJson(conceptService.loadChildren(urn, lang));
        }
        return "";
    }

}
