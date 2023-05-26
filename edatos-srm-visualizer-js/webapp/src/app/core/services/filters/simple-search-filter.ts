import { Injectable } from '@angular/core';
import { AbstractControl, ɵTypedOrUntyped } from '@angular/forms';
export const ESCAPE_CHARACTER = '-';
@Injectable()
export class SimpleSearchFilter {
    public id: string | null | undefined;
    public urn: string | null | undefined;
    public name: string | null | undefined;
    public description: string | null | undefined;

    constructor() {
        this.id = '';
        this.name = '';
        this.urn = '';
        this.description = '';
    }

    public setValues(values: any): void {
        this.id = values.id || '';
        this.name = values.name || '';
        this.urn = values.urn || '';
        this.description = values.description || '';
    }

    public getCriteria(): string {
        let criterias = '';
        if (this.id) {
            criterias = criterias.concat(`ID ILIKE '%${this.escapeSingleQuotes(this.id)}%'`);
        }
        if (this.urn) {
            this.isEmpty(criterias);
            criterias = criterias.concat(`URN ILIKE '%${this.escapeSingleQuotes(this.urn)}%'`);
        }
        if (this.name) {
            this.isEmpty(criterias);
            criterias = criterias.concat(`NAME ILIKE '%${this.escapeSingleQuotes(this.name)}%'`);
        }
        if (this.description) {
            this.isEmpty(criterias);
            criterias = criterias.concat(`DESCRIPTION ILIKE '%${this.escapeSingleQuotes(this.description)}%'`);
        }
        return criterias;
    }

    private isEmpty(criterias: string): string{
        if(criterias){
            criterias = criterias.concat(` OR `);
        }
        return criterias;
    }
    private escapeSingleQuotes(literal: string): string {
        return literal.replace(new RegExp(ESCAPE_CHARACTER, 'g'), ESCAPE_CHARACTER + ESCAPE_CHARACTER).replace(new RegExp(`'`, 'g'), `${ESCAPE_CHARACTER}'`);
    }

}