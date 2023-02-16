import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { mergeMap, Observable, of } from 'rxjs';
import { SearchConfig } from 'src/app/shared/models/search-config';
import { ConfigService } from '../config/config.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public static apiStructuralResource: string = '';
  public static apiInternalDomain: string = '';
  public static apiSdmx: string = '';

  ALL_ELEMENTS: string = '~all';

  constructor(private httpClient: HttpClient, private config: ConfigService) {  }

  loadConfiguration () {
    this.config.getApiStructuralResources().subscribe(url => { ApiService.apiStructuralResource = url });
    this.config.getApiSdmx().subscribe( url => {ApiService.apiSdmx = url});
    ApiService.apiInternalDomain = this.config.getDomainInternal();
  }

  getFile(URL: string): Observable<Blob> {
    return this.httpClient.get(ApiService.apiSdmx.concat(URL), { responseType: 'blob' });
  }

  public getDataFromApiInternal(api: string): Observable<any> {
    return this.getData(ApiService.apiInternalDomain.concat(api));
  }

  public getDataFromStructureResource(api: string, searchConfig?: SearchConfig, query?: string): Observable<any> {
    if (searchConfig) {
      return this.getDataWithOffset(ApiService.apiStructuralResource.concat(api), searchConfig, query);
    }
    return this.getData(ApiService.apiStructuralResource.concat(api), query);
  }

  public getDataFormsFromStructureResource(api: string, searchConfig: SearchConfig, form?: FormGroup): Observable<any> {
    return this.getDataFromForm(ApiService.apiStructuralResource.concat(api), searchConfig, form);
  }

  private getData(URL: string, query?: string): Observable<any> {
    if (query) {
      this.httpClient.get<any>(URL.concat(query));
    }
    return this.httpClient.get<any>(URL);
  }

  private getDataWithOffset(URL: string, searchConfig: SearchConfig, query?: string): Observable<any> {
    if (query) {
      return this.httpClient.get<any>(URL.concat(this.getResultLimit(URL, searchConfig)).concat(query));
    }
    return this.httpClient.get<any>(URL.concat(this.getResultLimit(URL, searchConfig)));
  }

  private getDataFromForm(URL: string, searchConfig: SearchConfig, form?: FormGroup): Observable<any> {
    let query = this.getQuery('');
    if (form) {
      for (const element in form.controls) {
        if (form.get(element)?.value) {
          query = query.concat(encodeURIComponent(element + ' ilike "' + form.get(element)?.value + '"'));
        }
      }
      return this.getData(URL, query);
    }
    return this.getData(URL);
  }

  private getResultLimit(URL: string, searchConfig: SearchConfig): string {
    let beginParamURL = URL.includes('?') ? '&' : '?';
    return beginParamURL + 'limit=' + searchConfig.resultLimit + '&offset=' + searchConfig.resultOffset;
  }

  private getQuery(query: string): string {
    if (query === '') {
      return query = '?query=';
    }
    return query = query.concat('&');
  }

  private addURLParamt(param: string, value: string, query: string): string {
    return query = this.getQuery(query).concat(encodeURIComponent(param + ' eq "' + value + '"'));
  }
}
