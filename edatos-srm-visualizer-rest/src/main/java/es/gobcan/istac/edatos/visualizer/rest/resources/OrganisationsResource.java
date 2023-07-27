package es.gobcan.istac.edatos.visualizer.rest.resources;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/{urn}/organisations")
    public String getChildren(@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {
        if (!urn.isEmpty()) {
            return JsonUtils.toJson(organisationService.loadChildren(urn, lang));
        }
        return "";
    }
}
