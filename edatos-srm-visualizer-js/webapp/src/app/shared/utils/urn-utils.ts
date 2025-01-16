
export class UrnUtils {

    public static agency : string = '';
    public static resourceId : string = '';
    public static version : string = '';
    public static id : string = '';

    static splitUrn(urn: string): void {
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

    static getResourceTypeFromUrn(urn: string): string {
        let urnLeftSide = urn.split('=')[0];
        if (urnLeftSide.length > 1) {
            return urnLeftSide.lastIndexOf('.') !== -1 ? urnLeftSide.slice(urnLeftSide.lastIndexOf('.') + 1).toLowerCase() : "";
        } else {
            return urnLeftSide;
        }
    }

}
