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
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/xml', // Set the content type to XML
            'Accept': 'application/xml' // Set the accept type to XML
        }),
    };
    public getFile(resource: any): Observable<any> {
        console.log('getFile', resource);
        let api = this.apiSDMXUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
        console.log('getFile', api)
        return this.httpClient.get(ApiSdmxService.apiSdmx.concat(api), this.httpOptions);
    }

    /*
       let api = this.apiDetailUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
        return this.getData(ApiSrmService.apiStructuralResource.concat(api));
     */
}
