package es.gobcan.istac.edatos.visualizer.rest.resources;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.gobcan.istac.edatos.visualizer.core.services.DataStructureService;

import es.gobcan.istac.edatos.visualizer.utils.JsonUtils;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController()
@RequestMapping("/api/datastructures")
public class DataStructureResource {

    private final DataStructureService dataStructureService;
    @Autowired
    public DataStructureResource(DataStructureService dataStructureService) {

        this.dataStructureService = dataStructureService;
    }

    @GetMapping("/{urn}/all-versions")
    public String getAllVersionsFromResource(@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {
        List<String> versions = dataStructureService.loadAllDataStructureVersions(urn);
        return versions.isEmpty()? "" : JsonUtils.toJson(versions);
    }

}
