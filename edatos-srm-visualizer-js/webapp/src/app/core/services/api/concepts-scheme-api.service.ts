import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { environment } from 'src/environments/environments';
import { ConfigService } from '../config/config.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConceptsSchemeApiService extends ApiService {


  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
    this.apiSearchDataPath = 'conceptScheme';
    this.apiSearchUrl = environment.apiUrlConceptsSchemes;
    this.apiDetailUrl = environment.apiUrlConceptsSchemeDetail;
    this.apiChildrensUrl = environment.apiCoreConceptsSchemes;
    this.apiChildrensTreeUrl = environment.apiCoreConceptsSchemes;
    this.apiChildrensDataPath = 'concept';
  }
}
