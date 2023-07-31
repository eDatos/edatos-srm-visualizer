import { Resource } from './resource.model';
import { TranslateService } from '@ngx-translate/core';

export class DsdResource extends Resource {
    publicationDate: string = '';

    typeDimension: string = '';
    concept: string = '';

    assigmentStatus: string = '';
    attributeRelationship: string = '';
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

