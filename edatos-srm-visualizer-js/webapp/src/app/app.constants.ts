let _VERSION = '0.0.1-SNAPSHOT'; // This value will be overwritten by webpack
let _AVAILABLE_LANGUAGES = ['es', 'en', 'ca'];

export const VERSION = _VERSION;
export const AVAILABLE_LANGUAGES = _AVAILABLE_LANGUAGES;
export const LANG_KEY = 'lang';
export const DEFAULT_LANG = 'es';

export const PAGINATION_OPTIONS = [100, 150, 200] as const;
export const ITEMS_PER_PAGE = PAGINATION_OPTIONS[0];
