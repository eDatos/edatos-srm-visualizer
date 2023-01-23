import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ComplementosService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getHeader () : Observable<String> {
    return this.http.get (this.configService.getConfig().template.headerUrl, {responseType: 'text', withCredentials: true});
  }

  getFooter() : Observable<String> {
    return this.http.get (this.configService.getConfig().template.footerUrl, {responseType: 'text', withCredentials: true});
  }
}
