import { Resource } from './resource.model';
import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from '../../../core/services/locale.service';
import { DateUtils } from '../../utils/date-utils';

export class DsdResource extends Resource {
    publicationDate: string = '';

    typeDimension: string = '';
    concept: string = '';

    assigmentStatus: string = '';
    attributeRelationship: string = '';

    public static dsdResource(resource: any, maintainer: any, localeService: LocaleService): DsdResource {
        const dsdResource = new DsdResource(resource.urn);

        const maintainerName = localeService.getTextValue(maintainer.name.text);
        const name = localeService.getTextValue(resource.name?.text);
        const description = localeService.getTextValue(resource.description?.text);
        const annotations = localeService.getTextValue(resource.annotations?.text);

        dsdResource.publicationDate = resource.validFrom ? DateUtils.formatSimpleDate(resource.validFrom) : '';
        dsdResource.description = description;
        dsdResource.name = name;
        dsdResource.annotations = annotations;
        dsdResource.uri = resource.selfLink?.href;
        dsdResource.maintainer = `${maintainer.id} - ${maintainerName}`;

        return dsdResource;
    }

    public static dsdDimensionResource(dimension: any, translateService: TranslateService): DsdResource {
        const dsdResource = new DsdResource(dimension.urn);
        dsdResource.id = dimension.id;
        dsdResource.typeDimension = getTypeDimension(dimension.type, translateService);

        const concept = new Resource(dimension.conceptIdentity?.urn);
        dsdResource.concept = dimension.conceptIdentity?.id + ' (' + concept.resourceId + ')';
        dsdResource.urn = dimension.localRepresentation?.enumerationCodelist?.selfLink.href;
        
        return dsdResource;
    }

    public static dsdAttributeResource(attribute: any, translateService: TranslateService): DsdResource {
        const dsdResource = new DsdResource(attribute.urn);
        dsdResource.id = attribute.id;
        dsdResource.assigmentStatus = attribute.assignmentStatus;
        dsdResource.typeDimension = getTypeDimension(attribute.type, translateService);

        const concept = new Resource(attribute.conceptIdentity?.urn);
        dsdResource.concept = attribute.conceptIdentity?.id + ' (' + concept.resourceId + ')';
        dsdResource.attributeRelationship = getAttributeRelationship(attribute['attributeRelationship'], translateService);

        return dsdResource;
    }
}

class DsdAttributeRelationshipResourceType {
    static readonly GROUP = new DsdAttributeRelationshipResourceType('group');
    static readonly MEASURE = new DsdAttributeRelationshipResourceType('primaryMeasure');
    static readonly DIMENSION = new DsdAttributeRelationshipResourceType('dimensions');
    static readonly DATASETS = new DsdAttributeRelationshipResourceType('none');

    private constructor(private value: string) {}
    getValue(): string {
        return this.value;
    }
}

export function getAttributeRelationship(attribute: any, translateService: TranslateService): string {
    if (attribute[DsdAttributeRelationshipResourceType.GROUP.getValue()]) {
        return translateService.instant('dsd.attributeRelationship.group');
    } else if (attribute[DsdAttributeRelationshipResourceType.MEASURE.getValue()]) {
        return translateService.instant('dsd.attributeRelationship.primaryMeasure');
    } else if (attribute[DsdAttributeRelationshipResourceType.DIMENSION.getValue()]) {
        return translateService.instant('dsd.attributeRelationship.dimensions')
    } else if (attribute[DsdAttributeRelationshipResourceType.DATASETS.getValue()]) {
        return translateService.instant('dsd.attributeRelationship.none');
    } else {
        return '';
    }
}

class DsdTypeDimensionResourceType {
    static readonly MEASURE_DIMENSION = new DsdTypeDimensionResourceType('MEASURE_DIMENSION');
    static readonly DIMENSION = new DsdTypeDimensionResourceType('DIMENSION');
    static readonly TIME_DIMENSION = new DsdTypeDimensionResourceType('TIME_DIMENSION');
    static readonly SPATIAL = new DsdTypeDimensionResourceType('SPATIAL');

    private constructor(private value: string) {}
    getValue(): string {
        return this.value;
    }
}
export function getTypeDimension(dimensionType: any, translateService: TranslateService): string {
    if (dimensionType === DsdTypeDimensionResourceType.MEASURE_DIMENSION.getValue()) {
        return translateService.instant('dsd.typeDimension.measureDimension');
    } else if (dimensionType === DsdTypeDimensionResourceType.DIMENSION.getValue()) {
        return translateService.instant('dsd.typeDimension.dimension');
    } else if (dimensionType === DsdTypeDimensionResourceType.TIME_DIMENSION.getValue()) {
        return translateService.instant('dsd.typeDimension.timeDimension')
    } else if (dimensionType === DsdTypeDimensionResourceType.TIME_DIMENSION.getValue()) {
        return translateService.instant('dsd.typeDimension.spatial')
    } else {
        return dimensionType;
    }
}

