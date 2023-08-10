import { LocaleService } from '../../../core/services/locale.service';

export interface TreeNode {
    name: string;
    id: string;
    urn: string;
    description: string;
    selfLink: string;
    maintainer: string;
    scheme: string;
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
        scheme: ''
    };
    return treeNode;
}

export function treeNodeWithMaintainerAndScheme(maintainer: any, scheme: any, data: any, isLatestVersion: boolean, localeService: LocaleService) {
    const maintainerName = localeService.getTextValue(maintainer.name.text);
    const schemeName = localeService.getTextValue(scheme.name.text);

    const treeNode: TreeNode = {
        name: localeService.getTextValue(data.name.text),
        id: data.id,
        urn: data.urn,
        description: localeService.getTextValue(data.description?.text),
        selfLink: data.selfLink.href,
        maintainer: `${maintainer.id} - ${maintainerName}`,
        scheme: isLatestVersion ? `${scheme.id} - ${schemeName}` : `${scheme.id}(${scheme.version}) - ${schemeName}`
    };
    return treeNode;
}

export function treeNodeWithMaintainer(maintainer: any, data: any, isLatestVersion: boolean, localeService: LocaleService) {
    const maintainerName = localeService.getTextValue(maintainer.name.text);

    const treeNode: TreeNode = {
        name: localeService.getTextValue(data.name.text),
        id: isLatestVersion ? data.id : `${data.id}(${data.version})`,
        urn: data.urn,
        description: localeService.getTextValue(data.description?.text),
        selfLink: data.selfLink.href,
        maintainer: `${maintainer.id} - ${maintainerName}`,
        scheme: ''
    };
    return treeNode;
}

export function treeNodeWithMaintainerAndCodelistScheme(maintainer: any, codelistScheme: any, data: any, isLatestVersion: boolean, localeService: LocaleService) {
    const maintainerName = localeService.getTextValue(maintainer.name.text);

    const treeNode: TreeNode = {
        name: localeService.getTextValue(data.name.text),
        id: data.id,
        urn: data.urn,
        description: localeService.getTextValue(data.description?.text),
        selfLink: data.selfLink.href,
        maintainer: `${maintainer.id} - ${maintainerName}`,
        scheme: isLatestVersion ? `${codelistScheme.id} / ${maintainer.id} - ${maintainerName}`: `${codelistScheme.id}(${codelistScheme.version}) / ${maintainer.id} - ${maintainerName}`
    };
    return treeNode;
}
