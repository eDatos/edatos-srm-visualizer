package es.gobcan.istac.edatos.visualizer.rest.resources;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.siemac.metamac.rest.common.v1_0.domain.Resource;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.ItemResource;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.OrganisationSchemes;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Organisations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.services.MetadataConfiguracionService;
import es.gobcan.istac.edatos.visualizer.utils.JsonUtils;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController()
@RequestMapping("/api/organisations")
public class OrganisationsResource extends GenericResource {

    private final String urlApiChildrenDetails;
    private final String urlApiAllVersionsResource;
    @Autowired
    public OrganisationsResource(MetadataConfiguracionService metadataConfiguracionService) {
        super(metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/organisationschemes/~all/~all/~latest/organisations?query=PARENT%20eq%20%27#ID#%27"));
        this.urlApiChildrenDetails = metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/organisationschemes/#AGENCY#/#SCHEME#/#VERSION#/organisations");
        this.urlApiAllVersionsResource = metadataConfiguracionService.getStructuralResourcesApi().concat("/v1.0/organisationschemes/#AGENCY#/#SCHEME#");

    }

    @GetMapping("/{urn}/all-versions")
    public String getAllVersionsFromResource(@PathVariable("urn") String urn) {
        RestTemplate restTemplate = new RestTemplate();
        OrganisationSchemes schemes = restTemplate.getForEntity(getUrlApi(urn, urlApiAllVersionsResource), OrganisationSchemes.class).getBody();
        if (schemes != null) {
            List<String> result = new ArrayList<>();
            for (Resource resource : schemes.getOrganisationSchemes()) {
                Urn urnValues = new Urn(resource.getUrn());
                if(!urn.contains(urnValues.getVersion())){
                    result.add(urnValues.getVersion());
                }
            };
            return JsonUtils.toJson(result);
        }
        return "";
    }

    @GetMapping("/{urn}/organisations")
    public String getChildren(@PathVariable("urn") String urn, @RequestParam(value = "lang", defaultValue = "es") String lang) {
        RestTemplate restTemplate = new RestTemplate();
        Organisations organisations = restTemplate.getForEntity(getUrlApi(urn, urlApiChildrenDetails), Organisations.class).getBody();
        if (organisations != null) {
            List<TreeNode> result = new ArrayList<>();
            Urn urnValues = new Urn(urn);
            for (ItemResource organisation : organisations.getOrganisations()) {
                if(!organisation.getId().equalsIgnoreCase(urnValues.getId())) {
                    TreeNode treeNode = new TreeNode(organisation.getUrn(), loadInternationalString(organisation.getName().getTexts(), lang));
                    treeNode.getChildren().addAll(loadChildren(organisation.getUrn(), lang));
                    result.add(treeNode);
                }
            }
            return JsonUtils.toJson(result);
        }
        return "";
    }

    @Override
    protected List<TreeNode> loadChildren(String urn, String lang) {
        log.debug("Search soon {}", urn);
        Urn urnValue = new Urn(urn);
        URI urlApi = URI.create(urlApiChildrensFromParent.replace("#ID#", urnValue.getId()));
        RestTemplate restTemplate = new RestTemplate();
        Organisations body = restTemplate.getForEntity(urlApi, Organisations.class).getBody();
        List<TreeNode> organisationsChildren = new ArrayList<>();
        if (body != null && body.getTotal().doubleValue() > 0) {
            for (ItemResource bodyOrganisation : body.getOrganisations()) {
                TreeNode treeNode = new TreeNode(bodyOrganisation.getUrn(), loadInternationalString(bodyOrganisation.getName().getTexts(), lang));
                treeNode.getChildren().addAll(loadChildren(treeNode.getUrn(), lang));
                organisationsChildren.add(treeNode);
            }
        }
        return organisationsChildren;
    }
}
