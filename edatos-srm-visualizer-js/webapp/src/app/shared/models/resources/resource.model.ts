import { LocaleService } from 'src/app/core/services/locale.service';
import { UrnUtils } from 'src/app/shared/utils/urn-utils';

export class Resource {
    agency: string = '';
    version: string = '';
    resourceId: string = '';
    id: string = '';
    description: string = '';
    urn: string = '';
    name: string = '';
    annotations: string = '';
    uri: string = '';
    maintainer: string = '';
    selfLink: string = '';


    constructor(urn?: string) {
        if (urn) {
            this.urn = urn;
            UrnUtils.splitUrn(urn);
            this.agency = UrnUtils.agency;
            this.resourceId = UrnUtils.resourceId;
            this.version = UrnUtils.version;
            this.id = UrnUtils.id;
        }
    }

    protected setCommonFields (resource: any, localeService: LocaleService) { 
        this.description = localeService.getTextValue(resource.description?.text);
        this.name = localeService.getTextValue(resource.name?.text);
        this.annotations = this.getAnnotations(resource.annotations, localeService);
        this.uri = resource.selfLink?.href;
    }

    private getAnnotations(annotations: any, localeService: LocaleService) {
        if (!annotations || !annotations.annotation) {
            return '';
        }

        return (annotations.annotation)
            .map((a:any) => '<span>' + localeService.getTextValue(a.text?.text))
            .filter((text:any) =>  !!text)
            .join('</span>');
    }
    
}
