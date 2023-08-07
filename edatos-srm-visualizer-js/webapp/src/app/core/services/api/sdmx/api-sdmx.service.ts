import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export abstract class ApiSdmxService extends ApiService{

    public apiSDMXUrl: string = '';

    /*

          if (headers.get('X-Public-Request') == "1") {
            // Bypassing authentication for those requests that are marked as public because of CORS problems
            headers = headers.delete('X-Public-Request');
            return next.handle(req.clone({ headers: headers, body: instanceToPlain(req.body) }));
        }
     */
    public getFile(resource: any): Observable<any> {
        let api = this.apiSDMXUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
        return this.httpClient.get(ApiSdmxService.apiSdmx.concat(api));
    }

    /*
       let api = this.apiDetailUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
        return this.getData(ApiSrmService.apiStructuralResource.concat(api));
     */
}
