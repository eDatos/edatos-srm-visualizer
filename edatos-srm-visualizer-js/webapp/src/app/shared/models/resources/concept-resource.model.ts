import { Resource } from "./resource.model";
import { LocaleService } from 'src/app/core/services/locale.service';

export class ConceptResource extends Resource {
    conceptScheme: string = '';
    urnVariable: string = '';
    idVariable: string = '';

    isVariable: boolean = false;

    public static conceptResource(resource: any, maintainer: any, localeService: LocaleService, scheme?: any): ConceptResource {
        const conceptResource = new ConceptResource(resource.urn);

        const maintainerName = localeService.getTextValue(maintainer.name.text);
        const schemeName = scheme? localeService.getTextValue(scheme.name.text) : '';
        const name = localeService.getTextValue(resource.name?.text);
        const description = localeService.getTextValue(resource.description?.text);
        const annotations = localeService.getTextValue(resource.annotations?.text);

        conceptResource.isVariable = !!resource.variable;

        conceptResource.conceptScheme = scheme?`${scheme?.id}(${schemeName})` : '';
        conceptResource.description = description;
        conceptResource.name = name;
        conceptResource.annotations = annotations;
        conceptResource.uri = resource.selfLink?.href;
        conceptResource.maintainer = `${maintainer.id} - ${maintainerName}`;
        conceptResource.idVariable = resource.variable?.id;
        conceptResource.urnVariable = resource.variable?.urn

        return conceptResource;
    }

}
