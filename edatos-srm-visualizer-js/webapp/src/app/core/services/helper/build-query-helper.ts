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
        if (!url?.includes(BuildQueryHelper.withQuery)) {
            return url.concat(BuildQueryHelper.withQuery.concat(encodeURIComponent(query)));
        } else {
            return url.concat(encodeURIComponent(isLatestVersion ? this.buildUrlLatestOfQuery(url, query) :this.buildUrlOfQuery(url, query)));
        }
    }

    public buildUrlOfQuery(url: string, query: string): string {
        let beginParamUrl = url.includes('?') ? ' AND ' : BuildQueryHelper.withQuery;
        return beginParamUrl.concat(query);
    }

    public buildUrlLatestOfQuery(url: string, query: string): string {
        let beginParamurl = url.includes('?') ? ' AND (' : BuildQueryHelper.withQuery;
        return beginParamurl.concat(query).concat(')');
    }

    public getResultLimit(url: string, searchConfig: SearchConfig): string {
        let beginParamurl = url.includes('?') ? '&' : '?';
        return beginParamurl + 'limit=' + searchConfig.resultLimit + '&offset=' + searchConfig.resultOffset;
    }

    public buildQueryResultOffset(searchSimpleForm: FormGroup, searchForm: FormGroup) : string {
        return searchSimpleForm.value.filter ? this.buildQueryFromForm(searchForm) : '';
    }
}
