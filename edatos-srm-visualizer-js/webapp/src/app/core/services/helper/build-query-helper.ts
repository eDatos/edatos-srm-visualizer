import { FormGroup } from '@angular/forms';
import { SearchFormValues } from 'src/app/shared/models/search-values/search-form-values';
import { SearchConfig } from 'src/app/shared/models/search-config';
import { SimpleSearchFilter } from 'src/app/core/services/filters/simple-search-filter';

export class BuildQueryHelper {

    private static readonly withQuery: string = '?query=';

    protected simpleSearchFilter: SimpleSearchFilter = new SimpleSearchFilter();
    public buildQueryFromForm(form?: FormGroup<SearchFormValues>): string {
        let query = '';
        if (form) {
            query = this.simpleSearchFilter.getCriteria(form.controls);
        }
        return query;
    }

    public buildAdvanceQueryFromForm(isLatestVersion: boolean, form: FormGroup<SearchFormValues>): string {
        let query = '';
        if (form) {
            query = this.simpleSearchFilter.getCriteriaAdvanced(isLatestVersion, form.controls);
        }
        return query;
    }

    public buildQueryUrl(url: string, query: string, isLatestVersion: boolean, api?: string) {
        const queryPlaceholder = '{query}';
        if (!url?.includes(BuildQueryHelper.withQuery)) {
            return url.concat(BuildQueryHelper.withQuery.concat(encodeURIComponent(query)));
        } else {
            const buildUrlQuery = isLatestVersion ? this.buildUrlLatestOfQuery(url, query) :this.buildUrlOfQuery(url, query);
            url = url.includes(queryPlaceholder)? url.replace('{query}',encodeURIComponent(buildUrlQuery)) :
                url.concat(encodeURIComponent(buildUrlQuery));
            return url;
        }
    }

    public buildUrlOfQuery(url: string, query: string): string {
        const beginParamUrl = url.includes('?') ? ' AND ' : BuildQueryHelper.withQuery;
        return beginParamUrl.concat(query);
    }

    public buildUrlLatestOfQuery(url: string, query: string): string {
        const beginParamUrl = url.includes('?') ? ' AND (' : BuildQueryHelper.withQuery;
        return beginParamUrl.concat(query).concat(')');
    }

    public getResultLimit(url: string, searchConfig: SearchConfig): string {
        let beginParamUrl = url.includes('?') ? '&' : '?';
        beginParamUrl += 'limit=' + searchConfig.resultLimit + '&offset=' + searchConfig.resultOffset;
        beginParamUrl += searchConfig.orderColumn ? '&orderBy=' + searchConfig.orderColumn + ' ' + searchConfig.sortOrder : '';
        return beginParamUrl;
    }

    public buildQueryResultOffset(searchSimpleForm: FormGroup, searchForm: FormGroup, isLatestVersion: boolean, isAdvancedSearch?: boolean, ) : string {
        if (!isAdvancedSearch) {
            return searchSimpleForm.value.filter ? this.buildQueryFromForm(searchForm) : '';
        }
        return this.buildAdvanceQueryFromForm(isLatestVersion, searchSimpleForm);
    }
}
