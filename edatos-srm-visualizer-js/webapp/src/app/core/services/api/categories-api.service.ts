import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { environment } from 'src/environments/environments';
import { ConfigService } from '../config/config.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService extends ApiService{
  
  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
    this.apiDetailUrl = environment.apiUrlCategoriesDetail;
  }





}
