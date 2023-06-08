import { Injectable } from '@angular/core';

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
        if (this.id && typeof this.id === 'string') {
            criterias = criterias.concat(`ID ILIKE '%${this.id}%'`);
        }
        if (this.urn && typeof this.urn === 'string') {
            criterias = this.isEmpty(criterias).concat(`URN ILIKE '%${this.urn}%'`);
        }
        if (this.name && typeof this.name === 'string') {
            criterias = this.isEmpty(criterias).concat(`NAME ILIKE '%${this.name}%'`);
        }
        if (this.description && typeof this.description === 'string') {
            criterias = this.isEmpty(criterias).concat(`DESCRIPTION ILIKE '%${this.description}%'`);
        }
        return criterias;
    }

    private isEmpty(criterias: string): string{
        if(criterias){
            criterias = criterias.concat(` OR `);
        }
        return criterias;
    }

}
