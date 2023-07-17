export interface FlatTreeNode {
    expandable: boolean;
    name: string;
    count: number | undefined;
    level: number;
    urn: string;
    id: string;
    description: string;
    selfLink: string;
    maintainer: string;
    scheme: string;
}
