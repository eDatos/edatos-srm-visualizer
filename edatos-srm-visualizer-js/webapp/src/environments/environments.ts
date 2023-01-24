const url_domain = 'https://estadisticas.arte-consultores.com/structural-resources/v1.0/';
//const url_domain = 'http://localhost:8080/structural-resources-internal-4.0.1-SNAPSHOT/apis/structural-resources-internal/v1.0/';

export const environment = {
    production: false,
    apiUrlConceptDetail: url_domain + 'conceptschemes/#AGENCY#/#RESOURCEID#/#VERSION#/concepts/#ID#',
    apiUrlConcepts: url_domain + 'conceptschemes/#AGENCY#/#RESOURCEID#/#VERSION#/concepts/',
    apiUrlConceptsSchemeDetail: url_domain + 'conceptschemes/#AGENCY#/#RESOURCEID#/#VERSION#/',
    apiUrlConceptsSchemes: url_domain + 'conceptschemes/',
    apiUrlCodeLists: url_domain + 'codelists',
    apiUrlCodeListsFamilies: url_domain + 'codelistfamilies',
    apiUrlCodeListsCodes: url_domain + 'codelists/~all/~all/~latest/codes',
    apiUrlDSD: url_domain + 'datastructures',
    apiUrlOrganizations: url_domain + 'organisationschemes/~all/~all/~latest/organisations',
    apiUrlOrganizationsScheme: url_domain + 'organisationschemes',
    apiUrlCategories: url_domain + 'categoryschemes/~all/~all/~latest/categories',
    apiUrlCategoriesSchemes: url_domain + 'categoryschemes'
  };