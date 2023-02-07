import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchConfig } from 'src/app/shared/models/search-config';
import { ConfigService } from '../config/config.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  ALL_ELEMENTS: string = '~all';


  constructor(private httpClient: HttpClient) {}


  getData (URL: string, query?: string): Observable<any> {
    if (query) {
      this.httpClient.get<any>(URL.concat(query));
    }
    return this.httpClient.get<any>(URL);
  }
  
  getDataWithOffset (URL: string, searchConfig: SearchConfig, query?: string): Observable<any> {
    if (query) {
      return this.httpClient.get<any>(URL.concat(this.getResultLimit(URL, searchConfig)).concat(query));
    }
    return this.httpClient.get<any>(URL.concat(this.getResultLimit(URL, searchConfig)));
  }

  public getDataFromForm(URL: string, searchConfig: SearchConfig, form?: FormGroup): Observable<any> {
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
    let beginParamURL = URL.includes('?')? '&': '?';
    return beginParamURL + 'limit=' + searchConfig.resultLimit + '&offset=' + searchConfig.resultOffset;
  }

  private getQuery(query: string): string {
    if (query === '') {
      return query = '?query=';
    }
    return query = query.concat('&');
  }

  public addURLParamt(param: string, value: string, query: string): string {
    return query = this.getQuery(query).concat( encodeURIComponent(param + ' eq "' + value + '"'));
  }
}
