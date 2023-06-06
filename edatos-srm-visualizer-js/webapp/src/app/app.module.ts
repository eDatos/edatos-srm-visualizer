import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SafeHtmlPipe } from './shared/pipes/safe-html/safe-html.pipe';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StructuralResourcesModule } from './modules/structural-resources/structural-resources.module';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { AVAILABLE_LANGUAGES, DEFAULT_LANG } from './app.constants';
import { ConfigService } from './core/services/config/config.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { catchError, Observable } from 'rxjs';
import { MissingTranslationCustomHandler } from './core/handler/missing-translation-custom-handler';
import { ScriptLoaderModule } from 'ngx-script-loader';
import { MatIconModule } from '@angular/material/icon';


class CustomTranslateHttpLoader extends TranslateHttpLoader {

    private readonly defaultLang: string;

    constructor(http: HttpClient, defaultLang: string, prefix?: string, suffix?: string) {
        super(http, prefix, suffix);
        this.defaultLang = defaultLang;
    }

    override getTranslation(lang: string): Observable<Object> {
        return super.getTranslation(lang).pipe(catchError(() => {
            return super.getTranslation(this.defaultLang);
        }));
    }
}

export function createTranslateLoader(http: HttpClient) {
    return new CustomTranslateHttpLoader(http, DEFAULT_LANG, './assets/i18n/', '.json');
}

export function initTranslations(translateService: TranslateService, cookieService: CookieService, configService: ConfigService) {
    return () => new Promise<any>((resolve: any) => {
        configService.getLanguageCookie().subscribe((languageCookie: string) => {
            const currentLang: string = cookieService.get(languageCookie) || DEFAULT_LANG;
            translateService.setDefaultLang(DEFAULT_LANG);
            translateService.addLangs(AVAILABLE_LANGUAGES);
            translateService.use(currentLang);
            resolve();
        });
    });
}

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        SafeHtmlPipe
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        MatIconModule,
        ScriptLoaderModule,
        StructuralResourcesModule,
        TranslateModule.forRoot({
            missingTranslationHandler: {
                provide: MissingTranslationHandler,
                useClass: MissingTranslationCustomHandler
            },
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    exports: [],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initTranslations,
            deps: [TranslateService, CookieService, ConfigService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}
