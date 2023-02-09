import { AppComponent } from "src/app/app.component";
const apiUrl  = AppComponent.apiStructuralResource;
const apiInternal = AppComponent.internalDomain;
const apiSdmx = AppComponent.apiSdmx;

export const environment = {
    production: false,
    apiUrlConceptDetail: apiUrl + '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/concepts/{id}',
    apiUrlConcepts: apiUrl + '/v1.0/conceptschemes/~all/~all/~latest/concepts/',
    apiUrlConceptsSchemeDetail: apiUrl + '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/',
    apiUrlConceptsSchemes: apiUrl + '/v1.0/conceptschemes/?query=LATEST%20EQ%20%27true%27',
    apiUrlCodeLists: apiUrl + '/v1.0/codelists/?query=LATEST%20EQ%20%27true%27',
    apiUrlCodeListsDetail: apiUrl + '/v1.0/codelists/{agencyID}/{resourceID}/{version}',
    apiUrlCodeListsFamilies: apiUrl + '/v1.0/codelistfamilies/',
    apiUrlCodeListsFamiliesDetail: apiUrl + '/v1.0/codelistfamilies/{id}/',
    apiUrlCodeListsCodes: apiUrl + '/v1.0/codelists/~all/~all/~latest/codes',
    apiUrlCodeListsCodesDetail: apiUrl + '/v1.0/codelists/{agencyID}/{resourceID}/{version}/codes/{id}',
    apiUrlDSD: apiUrl + '/v1.0/datastructures/?query=LATEST%20EQ%20%27true%27',
    apiUrlDSDDetail: apiUrl + '/v1.0/datastructures/{agencyID}/{resourceID}/{version}',
    apiUrlOrganizations: apiUrl + '/v1.0/organisationschemes/~all/~all/~latest/organisations',
    apiUrlOrganizationsDetail: apiUrl + '/v1.0/organisationschemes/{agencyID}/{resourceID}/{version}/organisations/{id}',
    apiUrlOrganizationsScheme: apiUrl + '/v1.0/organisationschemes/?query=LATEST%20EQ%20%27true%27',
    apiUrlOrganizationsSchemeDetail: apiUrl + '/v1.0/organisationschemes/{agencyID}/{resourceID}/{version}',
    apiUrlCategories: apiUrl + '/v1.0/categoryschemes/~all/~all/~latest/categories',
    apiUrlCategoriesDetail: apiUrl + '/v1.0/categoryschemes/{agencyID}/{resourceID}/{version}/categories/{id}',
    apiUrlCategoriesSchemes: apiUrl + '/v1.0/categoryschemes/?query=LATEST%20EQ%20%27true%27',
    apiUrlCategoriesSchemesDetail: apiUrl + '/v1.0/categoryschemes/{agencyID}/{resourceID}/{version}',

    ///v1.0/categorisations/ISTAC/ORDENACION_CONCEPTOS/01.001
    // SDMX API
    apiSDMXConceptsScheme: apiSdmx + '/v2.1/conceptscheme/{agencyID}/{resourceID}/{version}',
    // internal API
    apiCoreConcepts: apiInternal + '/api/conceptschemes/{urn}/concepts',
    apiCoreConceptsSchemes: apiInternal + '/api/conceptschemes/schemes/{urn}/concepts',
  };