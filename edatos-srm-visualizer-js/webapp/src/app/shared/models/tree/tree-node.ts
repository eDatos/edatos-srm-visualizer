import { LocaleService } from 'src/app/core/services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { UrnUtils } from '../../utils/urn-utils';

export interface TreeNode {
    name: string;
    id: string;
    urn: string;
    description: string;
    selfLink: string;
    maintainer: string;
    scheme: string;
    concept?: string;
    typeDimension?: string;
    assigmentStatus?: string;
    attributeRelationship?: string;
    localRepresentation?: string;
    recommended?: string;
    count?: number;
    children?: TreeNode[];
    version?: string;
    urlChildren?: string;
    
}

export function treeNode(data: any, isLatestVersion: boolean, localeService: LocaleService) {
    const treeNode: TreeNode = {
        name: localeService.getTextValue(data.name.text),
        id: data.id,
        urn: data.urn,
        description: localeService.getTextValue(data.description?.text),
        selfLink: data.selfLink.href,
        maintainer: '',
        scheme: '',
        concept: '',
        typeDimension: '',
        assigmentStatus: '',
        attributeRelationship: '',
        recommended: ''
    };
    return treeNode;
}

export function treeNodeWithMaintainerAndScheme(maintainer: any, scheme: any, data: any, isLatestVersion: boolean, localeService: LocaleService) {
    const schemeName = scheme.name?.text ? localeService.getTextValue(scheme.name.text) : scheme.name;

    const treeNode: TreeNode = {
        name: localeService.getTextValue(data.name.text),
        id: data.id,
        urn: data.urn,
        description: localeService.getTextValue(data.description?.text),
        selfLink: data.selfLink.href,
        maintainer: maintainer,
        scheme: isLatestVersion ? `${scheme.id} - ${schemeName}` : `${scheme.id}(${scheme.version}) - ${schemeName}`
    };
    return treeNode;
}

export function treeNodeWithMaintainer(maintainer: any, data: any, isLatestVersion: boolean, localeService: LocaleService, translateService?: TranslateService) {
    let recommended = '';
    if (UrnUtils.getResourceTypeFromUrn(data.urn) === 'codelist' && data.isRecommended !== 'undefined') {
       recommended = data.isRecommended ? translateService?.instant('yes') : translateService?.instant('no');
    }

    const treeNode: TreeNode = {
        name: localeService.getTextValue(data.name.text),
        id: isLatestVersion ? data.id : `${data.id}(${data.version})`,
        urn: data.urn,
        description: localeService.getTextValue(data.description?.text),
        selfLink: data.selfLink.href,
        maintainer: maintainer,
        scheme: '',
        recommended: recommended
    };
    return treeNode;
}

export function treeNodeWithMaintainerAndCodelist(codelist: any, data: any, isLatestVersion: boolean, localeService: LocaleService) {
    const maintainer = new Resource(data.urn).agency;

    const treeNode: TreeNode = {
        name: localeService.getTextValue(data.name.text),
        id: data.id,
        urn: data.urn,
        description: localeService.getTextValue(data.description?.text),
        selfLink: data.selfLink.href,
        maintainer: maintainer,
        scheme: isLatestVersion ? `${codelist.id}` : `${codelist.id}(${codelist.version})`
    };
    return treeNode;
}