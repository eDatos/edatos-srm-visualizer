import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';

export class MissingTranslationCustomHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        if (params.interpolateParams) {
            // @ts-ignore
            return params.interpolateParams['default'].toUpperCase() || params.key;
        }
        return params.key;
    }
}