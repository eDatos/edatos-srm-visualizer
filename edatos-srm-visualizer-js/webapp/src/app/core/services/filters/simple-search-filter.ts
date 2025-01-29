import { Injectable } from '@angular/core';
import { SearchFormValues } from 'src/app/shared/models/search-values/search-form-values';

@Injectable()
export class SimpleSearchFilter {

    public getCriteria(values: SearchFormValues): string {
        let criterias = '';
        if (values.id) {
            criterias = criterias.concat(`ID ILIKE '%${values.id}%'`);
        }
        if (values.urn) {
            criterias = this.concatOrIsNotEmpty(criterias).concat(`URN ILIKE '%${values.urn}%'`);
        }
        if (values.name) {
            criterias = this.concatOrIsNotEmpty(criterias).concat(`NAME ILIKE '%${values.name}%'`);
        }
        if (values.description) {
            criterias = this.concatOrIsNotEmpty(criterias).concat(`DESCRIPTION ILIKE '%${values.description}%'`);
        }
        return criterias;
    }

    private concatOrIsNotEmpty(criterias: string): string{
        if(criterias){
            criterias = criterias.concat(` OR `);
        }
        return criterias;
    }

    public getCriteriaAdvanced(isLatestVersion: boolean, values: SearchFormValues): string {
        let criterias = '';
        let version: string = '';
        if (values.id.value) {
            version = isLatestVersion ? '' : ` OR URN ILIKE '%${values.id.value}%' `;
            criterias = criterias.concat(`(ID ILIKE '%${values.id.value}%' ${version})`);
        }
        if (values.recommended.value !== null && values.recommended.value !== '') {
            criterias = this.concatAndIsNotEmpty(criterias).concat(values.recommended.value.value ? `IS_RECOMMENDED EQ 'true'`: `IS_RECOMMENDED EQ 'false'` );
        }
        if (values.name.value) {
            criterias = this.concatAndIsNotEmpty(criterias).concat(`NAME ILIKE '%${values.name.value}%'`);
        }
        if (values.description.value) {
            criterias = this.concatAndIsNotEmpty(criterias).concat(`DESCRIPTION ILIKE '%${values.description.value}%'`);
        }
        if (values.scheme.value) {
            criterias = this.concatAndIsNotEmpty(criterias).concat(`URN ILIKE '%${values.scheme.value}%'`);
        }
        return criterias;
    }


    private concatAndIsNotEmpty(criterias: string): string{
        if(criterias){
            criterias = criterias.concat(` AND `);
        }
        return criterias;
    }

}
