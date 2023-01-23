export interface TreeNode {
    name: string;
    id: string;
    urn: string;
    count?: number;
    children?: TreeNode[];
    version?: string;
    urlChildrens?: string;
}
