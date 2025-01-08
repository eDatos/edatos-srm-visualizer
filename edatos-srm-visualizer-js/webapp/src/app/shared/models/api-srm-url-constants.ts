export class ApiSrmUrlConstants {

    public static API_SRM_VERSION = '/v1.0/';
    public static LATEST_QUERY = `?query=LATEST EQ 'true'`;
    public static AND_LATEST_QUERY = ` AND LATEST EQ 'true'`;
    public static FIELDS_DESCRIPTION = 'fields=+description';


    public static ALL_ORGANISATIONS_SCHEMES_API_URL = 'organisationschemes/~all/~all/~latest/organisations/';
    public static ORGANISATION_BY_ORGANISATION_SCHEME_API_URL = 'organisationschemes/{agencyID}/{resourceID}/{version}/organisations/{id}';
    public static ORGANISATIONS_BY_ORGANISATION_SCHEME_API_URL = 'organisationschemes/{agencyID}/{resourceID}/{version}/organisations';
    public static ORGANISATION_SCHEME_API_URL = 'organisationschemes/{agencyID}/{resourceID}/{version}';
    public static ORGANISATION_SCHEME_LATEST_QUERY = `?query=ORGANISATION_SCHEME_LATEST EQ 'true'`;
    public static ORGANISATIONS_API_URL = '/api/organisations/{urn}/organisations';
    public static ORGANISATION_ALL_VERSIONS_API_URL = '/api/organisations/{urn}/all-versions';


    public static ALL_CATEGORY_SCHEMES_API_URL = 'categoryschemes/~all/~all/~all/categories/';
    public static CATEGORY_BY_CATEGORY_SCHEME_API_URL = 'categoryschemes/{agencyID}/{resourceID}/{version}/categories/{id}';
    public static CATEGORIES_BY_CATEGORY_SCHEME_API_URL = 'categoryschemes/{agencyID}/{resourceID}/{version}/categories';
    public static CATEGORY_SCHEME_API_URL = 'categoryschemes/{agencyID}/{resourceID}/{version}';
    public static CATEGORY_SCHEME_LATEST_QUERY = `?query=CATEGORY_SCHEME_LATEST EQ 'true'`;
    public static CATEGORIES_API_URL = '/api/categories/schemes/{urn}/categories';
    public static CATEGORIES_ALL_VERSIONS_API_URL = '/api/categories/{urn}/all-versions';


    public static ALL_CODELISTS_FAMILIES_API_URL = 'codelistfamilies/';
    public static CODELIST_FAMILY_API_URL = 'codelistfamilies/{id}';
    public static CODELISTS_BY_CODELIST_FAMILY_URN_API_URL = `codelists/?query=CODELIST_FAMILY_URN EQ '{codelistFamilyUrn}'`;
    public static CODELIST_IS_RECOMMENDED_QUERY = `IS_RECOMMENDED EQ 'true'`;

    public static ALL_CODES_API_URL = 'codelists/~all/~all/~all/codes/';
    public static CODE_BY_CODELIST_API_URL = `codelists/{agencyID}/{resourceID}/{version}/codes/{id}?fields=+variableElement, +description`;
    public static CODES_BY_CODELISTS_API_URL = 'codelists/{agencyID}/{resourceID}/{version}/codes';
    public static CODELIST_API_URL = 'codelists/{agencyID}/{resourceID}/{version}';
    public static CODELIST_LATEST_QUERY = `?query=CODELIST_LATEST EQ 'TRUE'`;
    public static VARIABLE_URN_QUERY = `?query=VARIABLE_URN EQ '{variableUrn}' AND LATEST EQ 'true'&fields=+description`;
    public static VARIABLE_ELEMENT_URN_QUERY = `?query=VARIABLE_ELEMENT_URN EQ '{variableElementUrn}' AND CODELIST_LATEST EQ 'true'&fields=+variableElement, +description`;
    public static CODELISTS_API_URL = '/api/codelists/codelists/{urn}/codes';
    public static CODELISTS_ALL_VERSIONS_API_URL = '/api/codelists/{urn}/all-versions';


    public static ALL_CONCEPTS_SCHEMES_API_URL = 'conceptschemes/~all/~all/~all/concepts/';
    public static CONCEPT_BY_CONCEPTS_SCHEME_API_URL = 'conceptschemes/{agencyID}/{resourceID}/{version}/concepts/{id}';
    public static CONCEPTS_BY_CONCEPT_SCHEME_API_URL = 'conceptschemes/{agencyID}/{resourceID}/{version}/concepts';
    public static CONCEPT_SCHEME_API_URL = 'conceptschemes/{agencyID}/{resourceID}/{version}';
    public static CONCEPT_SCHEME_LATEST_QUERY = `?query=CONCEPT_SCHEME_LATEST EQ 'true'{query}&fields=+description`;
    public static OTHER_CONCEPT_SCHEME_LATEST = `?query=CONCEPT_SCHEME_LATEST EQ 'true'&fields=+description`;
    public static CONCEPTS_API_URL = '/api/concepts/schemes/{urn}/concepts';
    public static CONCEPTS_ALL_VERSIONS_API_URL = '/api/concepts/{urn}/all-versions';


    public static ALL_DSD_API_URL = 'codelistfamilies/';
    public static DSD_API_URL = 'datastructures/{agencyID}/{resourceID}/{version}';
    public static DSD_ALL_VERSIONS_API_URL = '/api/datastructures/{urn}/all-versions';

}
