import {Resource} from "./resource.model";
import {LocaleService} from '../../../core/services/locale.service';
import {DateUtils} from '../../utils/date-utils';
import {TranslateService} from '@ngx-translate/core';

export class CodelistResource extends Resource {
    lastUpdatedDate: string = '';
    publicationDate: string = '';
    isRecommended: string = '';
    codelist: string = '';

    variableUrn: string = '';
    variableElementUrn: string = '';

    isVariableElement: boolean = false;

    public static familyCodelistResource(resource: any, localeService: LocaleService): CodelistResource {
        const codelistResource = new CodelistResource(resource.urn);

        codelistResource.setCommonFields(resource, localeService);
        codelistResource.variableUrn = resource.variable ? resource.variable.urn : '';
        codelistResource.maintainer = '';
        codelistResource.lastUpdatedDate = resource.lastUpdatedDate ? DateUtils.formatSimpleDate(resource.lastUpdatedDate) : '';

        return codelistResource;
    }

    public static codelistResource(resource: any, maintainer: any, localeService: LocaleService,
                                   translateService: TranslateService, isCodes: boolean, codelistScheme?: any): CodelistResource {
        const codelistResource = new CodelistResource(resource.urn);

        const maintainerName = localeService.getTextValue(maintainer.name.text);
        const codelist = codelistScheme ? localeService.getTextValue(codelistScheme.name.text) : '';
        const codelistSceme = `${resource.id}(v${resource.version})`;
        const codeCodelistScheme = resource.codelist ? `${resource.codelist.id}(${codelist})` : '';

        codelistResource.isVariableElement = !!resource.variableElement;

        codelistResource.setCommonFields(resource, localeService);
        codelistResource.lastUpdatedDate = resource.lifeCycle ? DateUtils.formatSimpleDate(resource.lifeCycle.lastUpdatedDate) : '';
        codelistResource.publicationDate = resource.validFrom ? DateUtils.formatSimpleDate(resource.validFrom) : '';
        codelistResource.isRecommended = resource.isRecommended ? translateService.instant('yes') : translateService.instant('no');
        codelistResource.codelist = isCodes ? codeCodelistScheme : codelistSceme;
        codelistResource.variableUrn = resource.variable ? resource.variable.urn : '';
        codelistResource.maintainer = `${maintainer.id} - ${maintainerName}`;
        codelistResource.variableElementUrn = resource.variableElement ? resource.variableElement.urn : '';

        return codelistResource;
    }

}
