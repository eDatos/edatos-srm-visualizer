package es.gobcan.istac.edatos.visualizer.rest.resources;

import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;
import es.gobcan.istac.edatos.visualizer.core.services.URNService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/categories")
public class CategoriesResource extends GenericResource{

    private final String URL_API_SCHEME_CHILDREN;

    @Autowired
    public CategoriesResource(URNService urnService, MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/categorisations/~all/~all/~latest/concepts?query=PARENT%20eq%20%27#ID#%27"), urnService);
        this.URL_API_SCHEME_CHILDREN = metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/conceptschemes/#AGENCY#/#SCHEME#/#VERSION#/concepts");
    }

    @GetMapping("/{urn}/categories")
    public String getChildrensFromCategories (@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {

        // FIXME
        return "";
    }


}
