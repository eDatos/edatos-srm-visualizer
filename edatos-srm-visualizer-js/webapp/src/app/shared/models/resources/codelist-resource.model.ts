import { Resource } from "./resource.model";
import { LocaleService } from '../../../core/services/locale.service';
import { DateUtils } from '../../utils/date-utils';
import { TranslateService } from '@ngx-translate/core';

export class CodelistResource extends Resource {
    lastUpdatedDate: string = '';
    isRecommended: string = '';
    codelist: string = '';

    variableUrn: string = '';

    public static familyCodelistResource(resource: any, localeService: LocaleService): CodelistResource {
        const codelistResource = new CodelistResource(resource.urn);

        const name = localeService.getTextValue(resource.name?.text);
        const description = localeService.getTextValue(resource.description?.text);
        const annotations = localeService.getTextValue(resource.annotations?.text);

        codelistResource.description = description;
        codelistResource.name = name;
        codelistResource.annotations = annotations;
        codelistResource.uri = resource.selfLink?.href;
        codelistResource.variableUrn = resource.variable ? resource.variable.urn : '';
        codelistResource.maintainer = '';

        return codelistResource;
    }

    public static codelistResource(resource: any, maintainer: any, localeService: LocaleService,
                                   translateService: TranslateService, isCodes: boolean, codelistScheme?: any): CodelistResource {
        const codelistResource = new CodelistResource(resource.urn);

        const maintainerName = localeService.getTextValue(maintainer.name.text);
        const codelist = codelistScheme? localeService.getTextValue(codelistScheme.name.text) : '';
        const codelistSceme = `${resource.id}(v${resource.version})`;
        const codeCodelistScheme = resource.codelist? `${resource.codelist.id}(${codelist})` : '';
        const name = localeService.getTextValue(resource.name?.text);
        const description = localeService.getTextValue(resource.description?.text);
        const annotations = localeService.getTextValue(resource.annotations?.text);

        codelistResource.lastUpdatedDate = resource.lifeCycle ? DateUtils.formatSimpleDate(resource.lifeCycle.lastUpdatedDate) : '';
        codelistResource.isRecommended = resource.isRecommended ? translateService.instant('yes') : translateService.instant('no');
        codelistResource.codelist = isCodes? codeCodelistScheme: codelistSceme;
        codelistResource.description = description;
        codelistResource.name = name;
        codelistResource.annotations = annotations;
        codelistResource.variableUrn = resource.variable ? resource.variable.urn : '';
        codelistResource.uri = resource.selfLink?.href;
        codelistResource.maintainer = `${maintainer.id} - ${maintainerName}`;

        return codelistResource;
    }

}
