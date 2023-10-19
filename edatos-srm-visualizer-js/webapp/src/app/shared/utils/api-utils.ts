export class ApiUtils {

    public static agency : string = '';
    public static resourceId : string = '';
    public static version : string = '';
    public static id : string = '';

    static apiLatestVersion(apiUrl: string, queryLatestUrl: string, isLatestVersion: boolean): string {
        const latestQuery = isLatestVersion ? queryLatestUrl : '';
        return `${apiUrl}${latestQuery}`;
    }
}
