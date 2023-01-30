const url_domain = 'https://estadisticas.arte-consultores.com/structural-resources/v1.0/';
//const url_domain = 'http://localhost:8080/structural-resources-internal-4.0.1-SNAPSHOT/apis/structural-resources-internal/v1.0/';

export const environment = {
    production: false,
    apiUrlConceptDetail: url_domain + 'conceptschemes/#AGENCY#/#RESOURCEID#/#VERSION#/concepts/#ID#',
    apiUrlConcepts: url_domain + 'conceptschemes/#AGENCY#/#RESOURCEID#/#VERSION#/concepts/',
    apiUrlConceptsSchemeDetail: url_domain + 'conceptschemes/#AGENCY#/#RESOURCEID#/#VERSION#/',
    apiUrlConceptsSchemes: url_domain + 'conceptschemes/',
    apiUrlCodeLists: url_domain + 'codelists',
    apiUrlCodeListsFamilies: url_domain + 'codelistfamilies/',
    apiUrlCodeListsFamiliesDetail: url_domain + 'codelistfamilies/#ID#/',
    apiUrlCodeListsCodes: url_domain + 'codelists/~all/~all/~latest/codes',
    apiUrlCodeListsCodesDetail: url_domain + 'codelists/#AGENCY#/#RESOURCEID#/#VERSION#/codes/#ID#',
    apiUrlDSD: url_domain + 'datastructures/#AGENCY#/#RESOURCEID#/#VERSION#/',
    apiUrlDSDDetail: url_domain + 'datastructures',
    apiUrlOrganizations: url_domain + 'organisationschemes/~all/~all/~latest/organisations',
    apiUrlOrganizationsDetail: url_domain + 'organisationschemes/#AGENCY#/#RESOURCEID#/#VERSION#/organisations/#ID#',
    apiUrlOrganizationsScheme: url_domain + 'organisationschemes',
    apiUrlOrganizationsSchemeDetail: url_domain + 'organisationschemes/#AGENCY#/#RESOURCEID#/#VERSION#',
    apiUrlCategories: url_domain + 'categoryschemes/~all/~all/~latest/categories',
    apiUrlCategoriesDetail: url_domain + 'categoryschemes/#AGENCY#/#RESOURCEID#/#VERSION#/categories/#ID#',
    apiUrlCategoriesSchemes: url_domain + 'categoryschemes',
    apiUrlCategoriesSchemesDetail: url_domain + 'categoryschemes/#AGENCY#/#RESOURCEID#/#VERSION#'
  };