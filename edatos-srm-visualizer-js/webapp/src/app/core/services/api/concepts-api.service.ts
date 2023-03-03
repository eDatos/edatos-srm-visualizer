import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { environment } from 'src/environments/environments';
import { ConfigService } from '../config/config.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConceptsApiService extends ApiService {
  

  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
    this.apiSearchDataPath = 'concept';
    this.apiSearchUrl = environment.apiUrlConcepts;
    this.apiDetailUrl = environment.apiUrlConceptDetail;
    this.apiChildrensUrl = environment.apiCoreConcepts;
    this.apiChildrensTreeUrl = environment.apiCoreConcepts;
    this.apiChildrensDataPath = '';
  }
}
