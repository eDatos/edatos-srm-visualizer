import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { map, mergeMap, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})

export class ComplementosService {
    private headers = new HttpHeaders();
    constructor(private http: HttpClient, private configService: ConfigService, private cookieService: CookieService, private translateService: TranslateService) {
        this.getHttpHeaders();
    }

    getHeader(): Observable<string> {
        return this.configService.getUrlHeader().pipe(
            mergeMap(url => {
                return this.http.get(url.concat(this.headerParamUrlFromLang().concat('&apiKey=' + this.headers.get('api-key'))), {responseType: 'text' }).pipe(map(value => {
                    return value.toString();
                }));
            })
        );
    }

    getFooter(): Observable<string> {
        return this.configService.getUrlFooter().pipe(
            mergeMap(url => {
                return this.http.get(url.concat(this.footerParamUrlFromLang()), { headers: this.headers, responseType: 'text' }).pipe(map(value => {
                    return value.toString();
                }));
            })
        );
    }

    private headerParamUrlFromLang(): string {
		const VERSION = process.env['APP_VERSION'];
        return '?appName=' + this.translateService.instant('title') + '&chosenLocale=' + this.currentLang() + '&appId=edatos-srm-visualizer-EXTERNAL' + '&appVersion=' + process.env["APP_VERSION"];
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

    private getHttpHeaders(): void {
        this.configService.getApikey().subscribe((value: string) => {
            this.headers = new HttpHeaders({'api-key': value});
        });
    }
}
