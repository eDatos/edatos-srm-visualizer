import { AppComponent } from "src/app/app.component";
const apiUrl  = AppComponent.apiStructuralResource;
const apiInternal = AppComponent.internalDomain;

export const environment = {
    production: false,
    apiUrlConceptDetail: apiUrl + '/v1.0/conceptschemes/#AGENCY#/#RESOURCEID#/#VERSION#/concepts/#ID#',
    apiUrlConcepts: apiUrl + '/v1.0/conceptschemes/#AGENCY#/#RESOURCEID#/#VERSION#/concepts/',
    apiUrlConceptsSchemeDetail: apiUrl + '/v1.0/conceptschemes/#AGENCY#/#RESOURCEID#/#VERSION#/',
    apiUrlConceptsSchemes: apiUrl + '/v1.0/conceptschemes/?query=LATEST%20EQ%20%27true%27',
    apiUrlCodeLists: apiUrl + '/v1.0/codelists',
    apiUrlCodeListsFamilies: apiUrl + '/v1.0/codelistfamilies/',
    apiUrlCodeListsFamiliesDetail: apiUrl + '/v1.0/codelistfamilies/#ID#/',
    apiUrlCodeListsCodes: apiUrl + '/v1.0/codelists/~all/~all/~latest/codes',
    apiUrlCodeListsCodesDetail: apiUrl + '/v1.0/codelists/#AGENCY#/#RESOURCEID#/#VERSION#/codes/#ID#',
    apiUrlDSD: apiUrl + '/v1.0/datastructures/#AGENCY#/#RESOURCEID#/#VERSION#/',
    apiUrlDSDDetail: apiUrl + '/v1.0/datastructures',
    apiUrlOrganizations: apiUrl + '/v1.0/organisationschemes/~all/~all/~latest/organisations',
    apiUrlOrganizationsDetail: apiUrl + '/v1.0/organisationschemes/#AGENCY#/#RESOURCEID#/#VERSION#/organisations/#ID#',
    apiUrlOrganizationsScheme: apiUrl + '/v1.0/organisationschemes',
    apiUrlOrganizationsSchemeDetail: apiUrl + '/v1.0/organisationschemes/#AGENCY#/#RESOURCEID#/#VERSION#',
    apiUrlCategories: apiUrl + '/v1.0/categoryschemes/~all/~all/~latest/categories',
    apiUrlCategoriesDetail: apiUrl + '/v1.0/categoryschemes/#AGENCY#/#RESOURCEID#/#VERSION#/categories/#ID#',
    apiUrlCategoriesSchemes: apiUrl + '/v1.0/categoryschemes',
    apiUrlCategoriesSchemesDetail: apiUrl + '/v1.0/categoryschemes/#AGENCY#/#RESOURCEID#/#VERSION#',
    // internal API
    apiCoreConcepts: apiInternal + '/edatos-srm-visualizer/api/conceptschemes/#urn#/concepts',
    apiCoreConceptsSchemes: apiInternal + '/edatos-srm-visualizer/api/conceptschemes/schemes/#urn#/concepts',
  };