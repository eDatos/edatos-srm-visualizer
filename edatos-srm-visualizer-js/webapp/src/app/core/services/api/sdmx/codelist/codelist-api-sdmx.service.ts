import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSdmxService } from 'src/app/core/services/api/sdmx/api-sdmx.service';
import { LocaleService } from 'src/app/core/services/locale.service';

@Injectable({
  providedIn: 'root'
})
export class CodelistApiSdmxService extends ApiSdmxService {
  
   constructor( httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
    super(httpClient, config, localeService);
    this.apiSDMXUrl = '/v2.1/codelist/{agencyID}/{resourceID}/{version}';
  }
}
