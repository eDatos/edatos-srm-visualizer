import { LocaleService } from 'src/app/core/services/locale.service';
import { Resource } from 'src/app/shared/models/resources/resource.model';

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
        attributeRelationship: ''
    };
    return treeNode;
}

export function treeNodeWithMaintainerAndScheme(maintainer: any, scheme: any, data: any, isLatestVersion: boolean, localeService: LocaleService) {
    const schemeName = localeService.getTextValue(scheme.name.text);

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

export function treeNodeWithMaintainer(maintainer: any, data: any, isLatestVersion: boolean, localeService: LocaleService, scheme?: any) {

    const treeNode: TreeNode = {
        name: localeService.getTextValue(data.name.text),
        id: isLatestVersion ? data.id : `${data.id}(${data.version})`,
        urn: data.urn,
        description: localeService.getTextValue(data.description?.text),
        selfLink: data.selfLink.href,
        maintainer: maintainer,
        scheme: scheme ? scheme : ''
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
        scheme: isLatestVersion ? `${codelist.id} / ${maintainer}` : `${codelist.id}(${codelist.version}) / ${maintainer}`
    };
    return treeNode;
}