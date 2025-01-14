import { Injectable } from "@angular/core";
import { ApiSdmxService } from "../api-sdmx.service";
import { ConfigService } from "../../../config/config.service";
import { LocaleService } from "../../../locale.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategorySchemeApiSdmxService extends ApiSdmxService {

  constructor(httpClient: HttpClient, configService: ConfigService, localeService: LocaleService) {
    super(httpClient, configService, localeService);
    this.apiSDMXUrl = "/v2.1/categoryscheme/{agencyID}/{resourceID}/{version}";
  }

}
