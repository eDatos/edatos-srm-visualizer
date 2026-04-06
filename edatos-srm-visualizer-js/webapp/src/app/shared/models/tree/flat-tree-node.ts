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
    schemeId?: string;
    schemeName?: string;
    concept: string | undefined;
    typeDimension: string | undefined;
    assigmentStatus: string | undefined;
    attributeRelationship: string | undefined;
    localRepresentation: string | undefined;
    recommended: string | undefined;
}
