package es.gobcan.istac.edatos.visualizer.rest.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.services.OrganisationService;
import es.gobcan.istac.edatos.visualizer.utils.JsonUtils;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController()
@RequestMapping("/api/organisations")
public class OrganisationsResource {

    private final OrganisationService organisationService;
    @Autowired
    public OrganisationsResource(OrganisationService organisationService) {
        this.organisationService = organisationService;
    }

    @GetMapping("/{urn}/all-versions")
    public String getAllVersionsFromResource(@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {
        List<String> versions = organisationService.loadAllOrganisationVersions(urn);
        return versions.isEmpty()? "" : JsonUtils.toJson(versions);
    }

    @GetMapping("/{urn}/organisations")
    public String getChildrenFromScheme(@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {
        List<TreeNode> treeNodes = organisationService.findOrganisationsFromScheme(urn, lang);
        return treeNodes.isEmpty()? "" : JsonUtils.toJson(treeNodes);
    }

}
