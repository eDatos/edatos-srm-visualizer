import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DsdApiService} from 'src/app/core/services/api/structural-resources/dsd/dsd-api.service';
import {LocaleService} from 'src/app/core/services/locale.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-tree-detail/basic-detail.component';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { DateUtils } from 'src/app/shared/utils/dateUtils';
import {
    DsdResource,
    getAttributeRelationship,
    getTypeDimension
} from 'src/app/shared/models/resources/dsd-resource.model';
import { Resource } from 'src/app/shared/models/resources/resource.model';

@Component({
    selector: 'app-codes-detail',
    templateUrl: './codes-detail.component.html',
    styleUrls: ['./codes-detail.component.scss'],
})
export class CodesDetailComponent extends BasicDetailComponent implements OnInit {

    public versions: any[] = [];
    public selectedVersion: string = '';

    public navLinks: MenuItem[];
    public activeLink: MenuItem;

    public dimensions: DsdResource[] = [];
    public attributes: DsdResource[] = [];
    public measures: DsdResource[] = [];
    constructor(protected override formBuilder: FormBuilder, protected override apiService: DsdApiService,
                protected override route: ActivatedRoute, private router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService
    ) {
        super(formBuilder, apiService, route, localeService, translateService);
        this.isDataWithChildrenTree = false;
        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            uri: '',
            description: '',
            version: '',
            agency: '',
            annotations: '',
            publicationDate: ''
        });

        this.navLinks = [
            {
                label: this.translateService.instant('dsd.mainMeasure')
            },
            {
                label: this.translateService.instant('dsd.dimensions')
            },
            {
                label: this.translateService.instant('dsd.attribute')
            }
        ];

        this.activeLink = this.navLinks[0];
    }

    loadAllVersionsFromResource(): void {
        this.apiService.getAllVersionsFromResource(this.dataDetail!).subscribe((data) => {
            if (data) {
                data.forEach((version: any) => {
                    this.versions.push({ value: version });
                });
            }
        });
    }

    loadDetailDataOnInit(): void {
        this.apiService.getDimensionAndAttributeAndMeasureData(this.dataDetail!).subscribe((data) => {
            if (data[this.apiService.apiDataStructureComponentsDataPath]) {
                let dataStructureComponents = data[this.apiService.apiDataStructureComponentsDataPath];
                this.getAttributes(dataStructureComponents);
                this.getDimensions(dataStructureComponents);
                this.measures.push(dataStructureComponents[this.apiService.apiMeasureDataPath]?.["primaryMeasure"]);
            }
            this.dataChildrenLoaded = true;
        });
    }

    private getAttributes(dataStructureComponents: any): DsdResource[] {
        if(dataStructureComponents[this.apiService.apiAttributeDataPath]) {
            this.attributes = dataStructureComponents[this.apiService.apiAttributeDataPath]["attribute"].map((attribute: any) => {
                const resource = new DsdResource(attribute.urn);
                resource.id = attribute.id;
                resource.assigmentStatus = attribute.assignmentStatus;
                let concept = new Resource(attribute.conceptIdentity?.urn);
                resource.concept = attribute.conceptIdentity?.id + ' (' + concept.resourceId + ')';
                resource.attributeRelationship = getAttributeRelationship(attribute['attributeRelationship'], this.translateService);
                return resource;
            });
        }
        return this.attributes;
    }

    private getDimensions(dataStructureComponents: any): DsdResource[] {
        if(dataStructureComponents[this.apiService.apiDimensionDataPath]) {
            this.dimensions = dataStructureComponents[this.apiService.apiDimensionDataPath]["dimension"].map((dimension: any) => {
                const resource = new DsdResource(dimension.urn);
                resource.id = dimension.id;
                resource.typeDimension = getTypeDimension(dimension.type, this.translateService);
                let concept = new Resource(dimension.conceptIdentity?.urn);
                resource.concept = dimension.conceptIdentity?.id + ' (' + concept.resourceId + ')';
                return resource;
            });
        }
        return this.dimensions
    }
    mapperDataResourceDetail(data: any): void {
        this.dataDetail = new DsdResource(data.urn);
        this.dataDetail!.description = this.localeService.getTextValue(data.description?.text);
        this.dataDetail!.name = this.localeService.getTextValue(data.name?.text);
        this.dataDetail!.annotations = this.localeService.getTextValue(data.annotations?.text);
        this.dataDetail!.publicationDate = data.validFrom ? DateUtils.formatSimpleDate(data.validFrom) : '';
        this.dataDetail!.uri = data.selfLink?.href;

        this.dataDetail!.version = this.dataDetail.version;

        this.detailForm.patchValue(this.dataDetail);
    }

    updateTableChildrenTreeNode(data: any): void {}

    onActiveItemChange(event: any) {
        this.activeLink = event;
    }

    public onLoadDetailVersion(version: string) {
        this.router.navigate(['dataStructure', this.dataDetail!.agency, version, 'detail'], { relativeTo: this.route.parent });
        this.versions = [];
    }
}
