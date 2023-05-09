import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { ApiService } from './api.service';


@Injectable({
    providedIn: 'root'
})
export class CodelistCodesApiService extends ApiService {

    constructor(httpClient: HttpClient, config: ConfigService) {
        super(httpClient, config);
    }
}