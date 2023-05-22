import { ElementRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { map, mergeMap, Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { AppComponent } from 'src/app/app.component';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})

export class ComplementosService {
    constructor(private http: HttpClient, private configService: ConfigService, private cookieService: CookieService, private translateService: TranslateService) {}

    getHeader(): Observable<string> {
        return this.configService.getUrlHeader().pipe(
            mergeMap(url => {
                return this.http.get(url.concat(this.headerParamUrlFromLang()), { responseType: 'text' }).pipe(map(value => {
                    return value.toString();
                }));
            })
        );
    }

    getFooter(): Observable<string> {
        return this.configService.getUrlFooter().pipe(
            mergeMap(url => {
                return this.http.get(url.concat(this.footerParamUrlFromLang()), { responseType: 'text' }).pipe(map(value => {
                    return value.toString();
                }));
            })
        );
    }

    private headerParamUrlFromLang(): string {
        return '?appName=' + this.translateService.instant('title') + '&chosenLocale=' + this.currentLang();
    }

    private footerParamUrlFromLang(): string {
        return '?chosenLocale=' + this.currentLang();
    }

    private currentLang(): string {
        let languageCookie: string = '';
        this.configService.getLanguageCookie().subscribe((value: string) => {
            languageCookie = value;
        });
        return this.cookieService.get(languageCookie);
    }
}
