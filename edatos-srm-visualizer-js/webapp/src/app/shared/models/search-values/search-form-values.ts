import { AbstractControl } from '@angular/forms';

export interface SearchFormValues {
    id: AbstractControl<string>;
    name: AbstractControl<string>;
    urn: AbstractControl<string>;
    description: AbstractControl<string>;
    maintainer: AbstractControl<string>;
    scheme: AbstractControl<string>;
    recommended: AbstractControl<any>;
}
