import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import * as xml2js from 'xml2js';


@Injectable({
    providedIn: 'root'
})

export abstract class ApiSdmxService extends ApiService {

    public apiSDMXUrl: string = '';

    public getSDMXFile(resource: any): Observable<any> {
        let api = this.apiSDMXUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version);
        return this.httpClient.get(ApiSdmxService.apiSdmx.concat(api), { responseType: 'blob' });
    }

    public getCSVFile(resource: any): Observable<any> {
        let api = this.apiSDMXUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version);
        return this.httpClient.get(ApiSdmxService.apiSdmx.concat(api), { responseType: 'blob' });
    }

    public getXLSFile(resource: any): Observable<any> {
        let api = this.apiSDMXUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version);
        return this.httpClient.get(ApiSdmxService.apiSdmx.concat(api), { responseType: 'blob' });
    }

    /*
       let api = this.apiDetailUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
        return this.getData(ApiSrmService.apiStructuralResource.concat(api));
     */
}
