import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Resource } from 'src/app/shared/models/resources/resource.model';


@Injectable({
    providedIn: 'root'
})

export abstract class ApiSdmxService extends ApiService {

    public getSDMXFile(resource: Resource): Observable<any> {
        return this.httpClient.get(ApiSdmxService.apiSdmx.concat(this.getApiSDMXUrl(resource)), { headers: ApiService.headers, responseType: 'blob' as 'json'});
    }
}
