import { Injectable } from '@angular/core';
import { SearchFormValues } from 'src/app/shared/models/search-values/search-form-values';
import { FormControl } from '@angular/forms';

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

    public getCriteriaAdvance(values: SearchFormValues): string {
        let criterias = '';
        if (values.id.value) {
            criterias = criterias.concat(`ID ILIKE '%${values.id.value}%'`);
        }
        if (values.urn.value) {
            criterias = this.concatAndIsNotEmpty(criterias).concat(`URN ILIKE '%${values.urn.value}%'`);
        }
        if (values.name.value) {
            criterias = this.concatAndIsNotEmpty(criterias).concat(`NAME ILIKE '%${values.name.value}%'`);
        }
        if (values.description.value) {
            criterias = this.concatAndIsNotEmpty(criterias).concat(`DESCRIPTION ILIKE '%${values.description.value}%'`);
        }
        return criterias;
    }

    public getCriteriaAdvanceByMaintainer(values: SearchFormValues) : string {
        let criterias = '';
        if (values.maintainer.value) {
            criterias = `ID ILIKE '%${values.maintainer.value}%' OR NAME ILIKE '%${values.maintainer.value}%'`;
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
