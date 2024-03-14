import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Constants } from 'src/app/shared/models/constants';
import { LocalisedString } from 'src/app/shared/models/localised-string.model';
import { DEFAULT_LANG } from 'src/app/app.constants';

@Injectable({
    providedIn: 'root'
})

export class LocaleService {

    private lang: string = '';

    constructor(private cookieService: CookieService) {
        this.lang = this.cookieService.check(Constants.chosenLocale) ? this.cookieService.get(Constants.chosenLocale) : DEFAULT_LANG;
        localStorage.setItem(Constants.chosenLocale, this.lang);
    }

    public getTextValue(texts: LocalisedString []) {
        if (texts) {
            const localeText: LocalisedString = texts.reduce((result, currentValue) => {
                if(currentValue.lang === this.lang) {
                    result = currentValue;
                } else if (currentValue.lang === DEFAULT_LANG && result.lang !== this.lang) {
                    result =  currentValue;
                }
                return result;
            });

            if (localeText && localeText.value) {
                return localeText.value;
            }
        }
        return '';
    }
}
