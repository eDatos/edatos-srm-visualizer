package es.gobcan.istac.edatos.visualizer.rest.resources;


import java.util.ArrayList;
import java.util.List;

import org.siemac.metamac.rest.common.v1_0.domain.Resource;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.DataStructures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;
import es.gobcan.istac.edatos.visualizer.utils.JsonUtils;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController()
@RequestMapping("/api/datastructures")
public class DataStructureResource extends GenericResource {

    @Autowired
    public DataStructureResource(MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/datastructures/#AGENCY#/#SCHEME#"));
    }

    @GetMapping("/{urn}/all-versions")
    public String getAllVersionsFromResource(@PathVariable("urn") String urn) {
        RestTemplate restTemplate = new RestTemplate();
        DataStructures dataStructures = restTemplate.getForEntity(getUrlApi(urn, urlApiChildrensFromParent), DataStructures.class).getBody();
        if (dataStructures != null) {
            List<String> result = new ArrayList<>();
            for (Resource resource : dataStructures.getDataStructures()) {
                Urn urnValues = new Urn(resource.getUrn());
                if(!urn.contains(urnValues.getVersion())){
                    result.add(urnValues.getVersion());
                }
            }
            return JsonUtils.toJson(result);
        }
        return "";
    }

    @Override
    protected List<TreeNode> loadChildren(String urn, String lang) {
        return null;
    }
}
