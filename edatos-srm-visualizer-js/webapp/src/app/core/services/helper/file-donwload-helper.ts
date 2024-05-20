import { Resource } from 'src/app/shared/models/resources/resource.model';
import { ApiSdmxService } from '../api/sdmx/api-sdmx.service';
import { ApiSrmService } from '../api/structural-resources/api-srm.service';
import { saveAs } from 'file-saver';

export class FileDonwloadHelper {

    constructor(protected apiSdmxService?: ApiSdmxService, protected apiSrmService?: ApiSrmService) {}

    public onDownloadSdmx(resource: any) {
        let resourceSdmx = new Resource(resource.urn);
        this.apiSdmxService?.getSDMXFile(resourceSdmx).subscribe((blob) => {
            const a = document.createElement('a');
            const objectUrl = URL.createObjectURL(blob);
            a.href = objectUrl;
            a.download = resourceSdmx.id + '.xml';
            a.click();
            URL.revokeObjectURL(objectUrl);
        });
    }

    public onDownloadJson(resource: any) {
        let resourceSdmx = new Resource(resource.urn);
        this.apiSrmService?.getJSONFile(resourceSdmx).subscribe((response: any) => {
                let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
                saveAs(blob, resourceSdmx.id + '.json');
            },
            (error: any) => {
                console.error('Error downloading JSON file:', error);
            }
        );
    }

    public onDownloadCsv(resource: any) {
        let resourceSdmx = new Resource(resource.urn);
        this.apiSrmService?.getCSVFile(resourceSdmx).subscribe((response: any) => {
                let blob:any = new Blob([response], { type: 'text/csv; charset=utf-8' });
                saveAs(blob, resourceSdmx.id + '.csv');
            },
            (error: any) => {
                console.error('Error downloading CSV file:', error);
            }
        );
    }

    public onDownloadXLSX(resource: any) {
        let resourceSdmx = new Resource(resource.urn);
        this.apiSrmService?.getXLSXFile(resourceSdmx).subscribe((response: any) => {
                let blob:any = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8' });
                saveAs(blob, resourceSdmx.id + '.xlsx');
            },
            (error: any) => {
                console.error('Error downloading XLSX file:', error);
            }
        );
    }

}
