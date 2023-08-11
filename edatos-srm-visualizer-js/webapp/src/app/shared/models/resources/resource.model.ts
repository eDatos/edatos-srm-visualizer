import { UrnUtils } from 'src/app/shared/utils/urn-utils';

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
    maintainer: string = '';


    constructor(urn?: string) {
        if (urn) {
            this.urn = urn;
            UrnUtils.splitUrn(urn);
            this.agency = UrnUtils.agency;
            this.resourceId = UrnUtils.resourceId;
            this.version = UrnUtils.version;
            this.id = UrnUtils.id;
        }
    }
}
