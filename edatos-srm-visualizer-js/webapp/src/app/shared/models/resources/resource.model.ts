export class Resource {
    agency: string = '';
    version: string = '';
    resourceId: string = '';
    id: string = '';
    description: string = '';
    urn: string = '';
    name: string = '';
    annotations: string = '';
    uri: string = '';


    constructor(urn?: string) {
        if (urn) {
            this.urn = urn;
            let splitText = urn.split('=')[1].split(':');
            this.agency = splitText[0];
            if (splitText.length > 1) {
                splitText = splitText[1].split(')');
                this.version = splitText[0].split('(')[1];
                this.resourceId = splitText[0].split('(')[0];
                this.id = splitText[1] ? splitText[1].replace('.', '') : this.resourceId;
            } else {
                this.id = splitText[0];
            }
        }
    }
}
