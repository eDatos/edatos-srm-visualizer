import { AppComponent } from "src/app/app.component";
const appName = 'Visualizador';

export const environment = {
    headerParamUrl: '?appName='+ appName + '&chosenLocale=es',
    apiUrlConceptDetail: '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/concepts/{id}',
    apiUrlConcepts: '/v1.0/conceptschemes/~all/~all/~latest/concepts/',
    apiUrlConceptsSchemeDetail: '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/',
    apiUrlConceptsSchemes: '/v1.0/conceptschemes/?query=LATEST%20EQ%20%27true%27',
    apiUrlCodeLists: '/v1.0/codelists/?query=LATEST%20EQ%20%27true%27',
    apiUrlCodeListsDetail: '/v1.0/codelists/{agencyID}/{resourceID}/{version}',
    apiUrlCodeListsFamilies: '/v1.0/codelistfamilies/',
    apiUrlCodeListsFamiliesDetail: '/v1.0/codelistfamilies/{id}/',
    apiUrlCodeListsCodes: '/v1.0/codelists/~all/~all/~latest/codes',
    apiUrlCodeListsCodesDetail: '/v1.0/codelists/{agencyID}/{resourceID}/{version}/codes/{id}',
    apiUrlDSD: '/v1.0/datastructures/?query=LATEST%20EQ%20%27true%27',
    apiUrlDSDDetail: '/v1.0/datastructures/{agencyID}/{resourceID}/{version}',
    apiUrlOrganizations: '/v1.0/organisationschemes/~all/~all/~latest/organisations',
    apiUrlOrganizationsDetail: '/v1.0/organisationschemes/{agencyID}/{resourceID}/{version}/organisations/{id}',
    apiUrlOrganizationsScheme: '/v1.0/organisationschemes/?query=LATEST%20EQ%20%27true%27',
    apiUrlOrganizationsSchemeDetail: '/v1.0/organisationschemes/{agencyID}/{resourceID}/{version}',
    apiUrlCategories: '/v1.0/categoryschemes/~all/~all/~latest/categories',
    apiUrlCategoriesDetail: '/v1.0/categoryschemes/{agencyID}/{resourceID}/{version}/categories/{id}',
    apiUrlCategoriesSchemes: '/v1.0/categoryschemes/?query=LATEST%20EQ%20%27true%27',
    apiUrlCategoriesSchemesDetail: '/v1.0/categoryschemes/{agencyID}/{resourceID}/{version}',

    ///v1.0/categorisations/ISTAC/ORDENACION_CONCEPTOS/01.001
    // SDMX API
    apiSDMXConceptsScheme: '/v2.1/conceptscheme/{agencyID}/{resourceID}/{version}',
    // internal API
    apiCoreConcepts: '/api/conceptschemes/{urn}/concepts',
    apiCoreConceptsSchemes: '/api/conceptschemes/schemes/{urn}/concepts',
  };