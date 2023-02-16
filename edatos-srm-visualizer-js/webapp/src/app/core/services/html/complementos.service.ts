import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ConfigService } from '../config/config.service';
import { map, mergeMap, Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class ComplementosService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getHeader(): Observable<string> {
    return this.configService.getUrlHeader().pipe(
      mergeMap( url => {
        console.log('URL cabecera ' + url);
        return this.http.get(url.concat(environment.headerParamUrl), { responseType: 'text' }).pipe(map( value => {
          return value.toString();
        }))
      })
    );
  }

  getFooter(): Observable<string> {
    return this.configService.getUrlFooter().pipe(
      mergeMap( url => {
        return this.http.get(url, { responseType: 'text'}).pipe(map( value => {
          return value.toString();
        }))
      })
    );
  }

}
