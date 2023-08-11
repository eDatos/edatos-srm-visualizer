import { Resource } from "./resource.model";
import { LocaleService } from '../../../core/services/locale.service';
import { DateUtils } from '../../utils/date-utils';

export class OrganisationResource extends Resource {
    publicationDate: string = '';
    organisationScheme: string = '';

    public static organisationResource(resource: any, maintainer: any, localeService: LocaleService, scheme?: any): OrganisationResource {
        const organisationResource = new OrganisationResource(resource.urn);

        const maintainerName = localeService.getTextValue(maintainer.name.text);
        const schemeName = scheme? localeService.getTextValue(scheme.name.text) : '';
        const name = localeService.getTextValue(resource.name?.text);
        const description = localeService.getTextValue(resource.description?.text);
        const annotations = localeService.getTextValue(resource.annotations?.text);

        organisationResource.publicationDate = resource.validFrom ? DateUtils.formatSimpleDate(resource.validFrom) : '';
        organisationResource.organisationScheme = scheme?`${scheme?.id}(${schemeName})` : '';
        organisationResource.description = description;
        organisationResource.name = name;
        organisationResource.annotations = annotations;
        organisationResource.uri = resource.selfLink?.href;
        organisationResource.maintainer = `${maintainer.id} - ${maintainerName}`;

        return organisationResource;
    }
}
