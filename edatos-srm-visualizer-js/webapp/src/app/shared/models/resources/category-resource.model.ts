import { Resource } from "./resource.model";
import { LocaleService } from '../../../core/services/locale.service';
import { DateUtils } from '../../utils/date-utils';

export class CategoryResource extends Resource {
    publicationDate: string = '';
    categoryScheme: string = '';

    public static categoryResource(resource: any, maintainer: any, localeService: LocaleService, scheme?: any): CategoryResource {
        const categoryResource = new CategoryResource(resource.urn);

        const maintainerName = localeService.getTextValue(maintainer.name.text);
        const schemeName = scheme? localeService.getTextValue(scheme.name.text) : '';
        const name = localeService.getTextValue(resource.name?.text);
        const description = localeService.getTextValue(resource.description?.text);
        const annotations = localeService.getTextValue(resource.annotations?.text);

        categoryResource.publicationDate = resource.validFrom ? DateUtils.formatSimpleDate(resource.validFrom) : '';
        categoryResource.categoryScheme = scheme?`${scheme?.id}(${schemeName})` : '';
        categoryResource.description = description;
        categoryResource.name = name;
        categoryResource.annotations = annotations;
        categoryResource.uri = resource.selfLink?.href;
        categoryResource.maintainer = `${maintainer.id} - ${maintainerName}`;

        return categoryResource;
    }
}
