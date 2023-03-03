import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { ConfigService } from '../config/config.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsApiService extends ApiService{


  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
  }
}
