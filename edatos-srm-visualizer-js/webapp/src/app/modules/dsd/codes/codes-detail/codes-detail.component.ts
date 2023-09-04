import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DsdApiService } from 'src/app/core/services/api/structural-resources/dsd/dsd-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import {
    DsdResource
} from 'src/app/shared/models/resources/dsd-resource.model';
import { TreeNode, treeNode } from 'src/app/shared/models/tree/tree-node';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';
import { Observable } from 'rxjs/internal/Observable';
import { DsdApiSdmxService } from 'src/app/core/services/api/sdmx/dsd/dsd-api-sdmx.service';


@Component({
    selector: 'app-codes-detail',
    templateUrl: './codes-detail.component.html',
    styleUrls: ['./codes-detail.component.scss']
})
export class CodesDetailComponent extends BasicDetailComponent implements OnInit {

    public versions: any[] = [];
    public selectedVersion: string = '';

    public navLinks: MenuItem[];
    public activeLink: MenuItem;

    public measureColumns: any[];
    public dimensionColumns: any[];
    public attributeColumns: any[];
    public routerLinkDetail: string = '';

    public dimensions: TreeNode[] = [];
    public attributes: TreeNode[] = [];
    public measures: TreeNode[] = [];

    constructor(protected override formBuilder: FormBuilder, protected override apiSrmService: DsdApiService,
                protected override route: ActivatedRoute, private router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService,
                protected override apiSdmxService: DsdApiSdmxService) {
        super(formBuilder, apiSrmService, route, localeService, translateService, apiSdmxService);
        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            uri: '',
            description: '',
            version: '',
            agency: '',
            annotations: '',
            publicationDate: '',
            maintainer: ''
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

        this.measureColumns = [
            { name: this.translateService.instant('resourceParameters.identifier'), value: 'id' },
            { name: this.translateService.instant('resourceParameters.name'), value: 'name' },
            { name: this.translateService.instant('resourceParameters.description'), value: 'description' }
        ];
        this.dimensionColumns = [
            { name: this.translateService.instant('resourceParameters.identifier'), value: 'id' },
            { name: this.translateService.instant('resourceParameters.type'), value: 'typeDimension' },
            { name: this.translateService.instant('resourceParameters.concept'), value: 'concept' }
        ];
        this.attributeColumns = [
            { name: this.translateService.instant('resourceParameters.identifier'), value: 'id' },
            { name: this.translateService.instant('resourceParameters.concept'), value: 'concept' },
            { name: this.translateService.instant('resourceParameters.type'), value: 'typeDimension' },
            { name: this.translateService.instant('dsd.parameters.relatedTo'), value: 'assigmentStatus' },
            { name: this.translateService.instant('dsd.parameters.assigned'), value: 'attributeRelationship' }
        ];
    }

    protected loadDetailData(): void {
        this.loadDataDetailResource(this.dataDetail).subscribe(data => {
            this.dataDetail = data;
            this.detailForm.patchValue(this.dataDetail);
            this.loadDetailDimensionAttributeAndMesures();
            this.loadAllVersionsFromResource();
        });
    }

    private loadDataDetailResource(data: any): Observable<DsdResource> {
        return this.apiSrmService.getDataDetailDsdResourceFromSrm(data);
    }

    loadAllVersionsFromResource(): void {
        this.apiSrmService.getAllVersionsFromResource(this.dataDetail!).subscribe((data) => {
            if (data) {
                data.forEach((version: any) => {
                    this.versions.push({ value: version });
                });
            }
        });
    }

    loadDetailDimensionAttributeAndMesures(): void {
        this.apiSrmService.getDimensionAndAttributeAndMeasureData(this.dataDetail!).subscribe((data) => {
            if (data[this.apiSrmService.apiDataStructureComponentsDataPath]) {
                const dataStructureComponents = data[this.apiSrmService.apiDataStructureComponentsDataPath];
                this.getMeasures(dataStructureComponents);
                this.getAttributes(dataStructureComponents);
                this.getDimensions(dataStructureComponents);
            }
            this.dataChildrenLoaded = true;
        });
    }

    private getAttributes(dataStructureComponents: any): TreeNode[] {
        if (dataStructureComponents[this.apiSrmService.apiAttributeDataPath]) {
            this.attributes = dataStructureComponents[this.apiSrmService.apiAttributeDataPath]['attribute'].map((attribute: any) => {
                return DsdResource.dsdAttributeResource(attribute, this.translateService);
            });
        }
        return this.attributes;
    }

    private getDimensions(dataStructureComponents: any): TreeNode[] {
        if (dataStructureComponents[this.apiSrmService.apiDimensionDataPath]) {
            this.dimensions = dataStructureComponents[this.apiSrmService.apiDimensionDataPath]['dimension'].map((dimension: any) => {
                return DsdResource.dsdDimensionResource(dimension, this.translateService);
            });
        }
        return this.dimensions;
    }

    private getMeasures(dataStructureComponents: any): TreeNode[] {
        this.measures.push(treeNode(dataStructureComponents[this.apiSrmService.apiMeasureDataPath]?.['primaryMeasure']['conceptIdentity'], false, this.localeService));
        return this.measures;
    }

    onActiveItemChange(event: any) {
        this.activeLink = event;
    }

    public onLoadDetailVersion(event: any) {
        this.versions = [];
        this.selectedVersion = event.value;
        this.router.navigate(['dataStructure', this.dataDetail!.agency, this.selectedVersion, 'detail'], { relativeTo: this.route.parent });
    }

    public onLoadMeasureDetail(urn: string): void {
        const measure = new DsdResource(urn);
        if (measure) {
            this.routerLinkDetail = `/codelists/${measure.agency}/${measure.resourceId}/${measure.version}/detail`;
        }
    }

    public onLoadDimensionDetail(urn: string): void {
        //TODO
    }

    public onLoadAttributeDetail(urn: string): void {
        //TODO
    }

}
