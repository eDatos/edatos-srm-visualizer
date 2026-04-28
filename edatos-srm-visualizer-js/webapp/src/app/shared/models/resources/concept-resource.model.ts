import { DateUtils } from "../../utils/date-utils";
import { Resource } from "./resource.model";
import { LocaleService } from 'src/app/core/services/locale.service';

export class ConceptResource extends Resource {
    conceptScheme = {};
   
    urnVariable: string = '';
    idVariable: string = '';
    publicationDate: string = '';

    isVariable: boolean = false;

    public static conceptResource(resource: any, maintainer: any, localeService: LocaleService, scheme?: any): ConceptResource {
        const conceptResource = new ConceptResource(resource.urn);

        const maintainerName = localeService.getTextValue(maintainer.name.text);
        const schemeName = scheme? localeService.getTextValue(scheme.name.text) : '';
        const name = localeService.getTextValue(resource.name?.text);
        const description = localeService.getTextValue(resource.description?.text);
        const annotations = conceptResource.getAnnotations(resource.annotations, localeService);

        conceptResource.isVariable = !!resource.variable;

        conceptResource.conceptScheme = scheme? { id: scheme?.id, name: schemeName, version: scheme?.version } : {id: "", name: "", version: ""};
        conceptResource.description = description;
        conceptResource.name = name;
        conceptResource.annotations = annotations;
        conceptResource.uri = resource.selfLink?.href;
        conceptResource.maintainer = `${maintainer.id} - ${maintainerName}`;
        conceptResource.idVariable = resource.variable?.id;
        conceptResource.urnVariable = resource.variable?.urn
        conceptResource.publicationDate = resource.validFrom ? DateUtils.formatSimpleDate(resource.validFrom) : '';

        return conceptResource;
    }

}
