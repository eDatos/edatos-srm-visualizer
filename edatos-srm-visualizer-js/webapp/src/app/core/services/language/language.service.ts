import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core/lib/translate.service';

export let CURRENT_LANGUAGE = '';
export function setCurrentLanguage(lang: string): void {
    CURRENT_LANGUAGE = lang;
}
@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    constructor(private http: HttpClient, private translateService: TranslateService) {}

    public init(): void {
        setCurrentLanguage(this.translateService.currentLang);
        this.translateService.onLangChange.subscribe((e: LangChangeEvent) => {
            setCurrentLanguage(e.lang);
        });
    }

    public changeLanguage(lang: string) {
        this.translateService.use(lang);
    }
}
