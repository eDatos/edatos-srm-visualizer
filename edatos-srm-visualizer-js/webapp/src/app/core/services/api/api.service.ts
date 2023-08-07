import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public static apiStructuralResource: string = '';
    public static apiInternalDomain: string = '';
    public static apiSdmx: string = '';

    ALL_ELEMENTS: string = '~all';
    protected constructor(protected httpClient: HttpClient, protected config: ConfigService) {}

    public loadConfiguration() {
        this.config.getApiStructuralResources().subscribe((url) => {
            ApiService.apiStructuralResource = url;
        });

        this.config.getApiSdmx().subscribe((url) => {
            ApiService.apiSdmx = url;
        });

        ApiService.apiInternalDomain = this.config.getDomainInternal();
    }

}
