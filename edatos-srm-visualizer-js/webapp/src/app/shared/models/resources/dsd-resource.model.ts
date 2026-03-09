import {Resource} from './resource.model';
import {TranslateService} from '@ngx-translate/core';
import {LocaleService} from '../../../core/services/locale.service';
import {DateUtils} from '../../utils/date-utils';

export class DsdResource extends Resource {
    publicationDate: string = '';

    typeDimension: string = '';
    concept: string = '';

    assigmentStatus: string = '';
    attributeRelationship: string = '';
    localRepresentation = {};

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

    public static dsdMeasureResource(measure: any, translateService: TranslateService): DsdResource {
        const dsdResource = new DsdResource(measure.urn);
        return dsdResource;
    }

    public static dsdDimensionResource(dimension: any, translateService: TranslateService, localeService: LocaleService): DsdResource {
        const dsdResource = new DsdResource(dimension.urn);
        dsdResource.id = dimension.id;
        dsdResource.typeDimension = getTypeDimension(dimension.type, dimension.isSpatial ? dimension.isSpatial : false, translateService);
        dsdResource.localRepresentation = this.getRepresentation(dimension.localRepresentation, localeService);

        const concept = new Resource(dimension.conceptIdentity?.urn);
        dsdResource.concept = dimension.conceptIdentity?.id + ' (' + concept.resourceId + ')';
        dsdResource.urn = dimension.conceptIdentity?.urn;
        dsdResource.selfLink = dimension.conceptIdentity?.selfLink.href;

        return dsdResource;
    }

    public static dsdAttributeResource(attribute: any, translateService: TranslateService): DsdResource {
        const dsdResource = new DsdResource(attribute.urn);
        dsdResource.id = attribute.id;
        dsdResource.assigmentStatus = getAssignmentStatus(attribute.assignmentStatus, translateService);
        dsdResource.typeDimension = getAttributeType(attribute.type, translateService);

        const concept = new Resource(attribute.conceptIdentity?.urn);
        dsdResource.concept = attribute.conceptIdentity?.id + ' (' + concept.resourceId + ')';
        dsdResource.attributeRelationship = getAttributeRelationship(attribute['attributeRelationship'], translateService);
        dsdResource.urn = attribute.conceptIdentity?.urn;
        dsdResource.selfLink = attribute.conceptIdentity?.selfLink.href;

        return dsdResource;
    }

    public static getRepresentation(localRepresentation: any, localeService: LocaleService) {
        const representationType = localRepresentation.enumerationCodelist ? localRepresentation.enumerationCodelist : localRepresentation.enumerationConceptScheme;
        if (!representationType) return '';
        
        const nameValue = localeService.getTextValue(representationType.name?.text);
        representationType.code =  representationType.id;
        representationType.id =  representationType.id + ' - ' + nameValue;
        
        return representationType;
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
export function getTypeDimension(dimensionType: any, isSpatial: boolean, translateService: TranslateService): string {
    if (dimensionType === DsdTypeDimensionResourceType.MEASURE_DIMENSION.getValue()) {
        return translateService.instant('dsd.typeDimension.measureDimension');
    } else if (dimensionType === DsdTypeDimensionResourceType.DIMENSION.getValue()) {
        if (isSpatial) {
            return translateService.instant('dsd.typeDimension.spatial');
        }
        return translateService.instant('dsd.typeDimension.dimension');
    } else if (dimensionType === DsdTypeDimensionResourceType.TIME_DIMENSION.getValue()) {
        return translateService.instant('dsd.typeDimension.timeDimension')
    } else {
        return dimensionType;
    }
}

class DsdAssignmentStatusResourceType {
    static readonly CONDITIONAL = new DsdAssignmentStatusResourceType('CONDITIONAL');
    static readonly MANDATORY = new DsdAssignmentStatusResourceType('MANDATORY');

    private constructor(private value: string) {}
    getValue(): string {
        return this.value;
    }
}
export function getAssignmentStatus(assignmentStatus: any, translateService: TranslateService): string {
    switch (assignmentStatus) {
        case DsdAssignmentStatusResourceType.CONDITIONAL.getValue():
            return translateService.instant('dsd.assignmentStatus.conditional');
        case DsdAssignmentStatusResourceType.MANDATORY.getValue():
            return translateService.instant('dsd.assignmentStatus.mandatory');
        default:
            return String(assignmentStatus);
    }
}

class DsdAttributeTypeResourceType {
    static readonly MEASURE = new DsdAttributeTypeResourceType('MEASURE');
    static readonly TIME = new DsdAttributeTypeResourceType('TIME');
    static readonly SPATIAL = new DsdAttributeTypeResourceType('SPATIAL');

    private constructor(private value: string) {}
    getValue(): string {
        return this.value;
    }
}
export function getAttributeType(attributeType: any, translateService: TranslateService): string {
    if (attributeType === DsdAttributeTypeResourceType.MEASURE.getValue()) {
        return translateService.instant('dsd.attributeType.measure');
    } else if (attributeType === DsdAttributeTypeResourceType.TIME.getValue()) {
        return translateService.instant('dsd.attributeType.time');
    } else if (attributeType === DsdAttributeTypeResourceType.SPATIAL.getValue()) {
        return translateService.instant('dsd.attributeType.spatial')
    }
    return '';

}

