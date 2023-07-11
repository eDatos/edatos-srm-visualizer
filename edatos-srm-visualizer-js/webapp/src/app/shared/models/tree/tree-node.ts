export interface TreeNode {
    name: string;
    id: string;
    urn: string;
    description: string;
    selfLink: string;
    maintainer: string;
    codelist: string;
    count?: number;
    children?: TreeNode[];
    version?: string;
    urlChildren?: string;
}
