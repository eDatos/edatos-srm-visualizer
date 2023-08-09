export interface FlatTreeNode {
    expandable: boolean;
    count: number | undefined;
    level: number;
    name: string;
    urn: string;
    id: string;
    description: string;
    selfLink: string;
    maintainer: string;
    scheme: string;
}
