import { Injectable } from '@angular/core';
import { SearchFormValues } from 'src/app/shared/models/search-values/search-form-values';

@Injectable()
export class SimpleSearchFilter {

    public getCriteria(values: SearchFormValues): string {
        let criterias = '';
        console.log('valor de values',values);
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

}
