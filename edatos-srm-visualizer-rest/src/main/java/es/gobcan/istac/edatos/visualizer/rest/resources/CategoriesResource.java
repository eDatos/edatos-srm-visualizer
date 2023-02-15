package es.gobcan.istac.edatos.visualizer.rest.resources;

import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;
import es.gobcan.istac.edatos.visualizer.core.services.URNService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/categories")
public class CategoriesResource extends GenericResource{

    private String urlApiChildrens;



    @Autowired
    public CategoriesResource(URNService urnService, MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/categoryschemes/~all/~all/~latest/categories?query=PARENT%20eq%20%27#ID#%27"), urnService);
        this.urlApiChildrens = metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/categoryschemes/#AGENCY#/#SCHEME#/#VERSION#/categories");
    }

    @GetMapping("/{urn}/categories")
    public String getChildrensFromCategories (@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {

        // FIXME
        return "";
    }


}
