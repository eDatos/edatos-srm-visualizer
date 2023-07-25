import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    CodelistCodesApiService
} from 'src/app/core/services/api/structural-resources/codelist/codelist-codes-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeDetailComponent } from 'src/app/shared/components/basic-tree-detail/basic-tree-detail.component';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { CodelistResource } from '../../../../shared/models/resources/codelist-resource.model';

@Component({
    selector: 'app-code-detail',
    templateUrl: './code-detail.component.html',
    styleUrls: ['./code-detail.component.scss']
})
export class CodeDetailComponent extends BasicTreeDetailComponent implements OnInit {

    public navLinks: MenuItem[];
    public activeLink: MenuItem;

    public otherCodes: CodelistResource[] = [];
    public equivalentCodes: CodelistResource[] = [];

    constructor(protected override formBuilder: FormBuilder, protected override apiService: CodelistCodesApiService,
                protected override route: ActivatedRoute, private router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService) {
        super(formBuilder, apiService, route, localeService, translateService);
        this.showChildrenTree = true;
        this.isDataWithChildrenTree = false;
        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
            version: '',
            agency: '',
            annotations: '',
            codelist: '',
            uri: ''
        });
        this.navLinks = [
            {
                label: this.translateService.instant('codelists.otherCodes')
            }, {
                label: this.translateService.instant('codelists.equivalentCodes')
            }
        ];

        this.activeLink = this.navLinks[0];
    }

    public updateTableChildrenTreeNode(data: any): void {
    }

    onLoadDetail(element: string) {
        let resource = new Resource(element);
        // FIXME
        this.router.navigate(['codelists', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent });
    }

    public onActiveItemChange(event: any) {
        this.activeLink = event;
        if (this.activeLink == this.navLinks[1]) {

        } else {

        }
    }

    private loadOtherCodes(): void {
        this.apiService.loadOtherCodes(this.dataDetail).subscribe((data) => {
            if (data[this.apiService.apiSearchDataPath]) {
                data[this.apiService.apiSearchDataPath].filter((code: any) => code.id != this.dataDetail.id)
                    .map((code: any) => {
                        const resource = new CodelistResource(code.urn);
                        resource.id = code.id;
                        resource.name = this.localeService.getTextValue(code.name?.text);
                        resource.description = this.localeService.getTextValue(code.description?.text);
                        this.otherCodes.push(resource);
                    });
                this.dataChildrenLoaded = true;
            }
        });
    }

    public parseDesriptionToHtml(): string {
        return this.detailForm.get('description')?.value || '';
    }

    public loadAllVersionsFromResource(): void {
    }

    public mapperDataResourceDetail(data: any): void {
        this.dataDetail = new CodelistResource(data.urn);
        this.dataDetail!.description = this.localeService.getTextValue(data.description?.text);
        this.dataDetail!.name = this.localeService.getTextValue(data.name?.text);
        this.dataDetail!.annotations = this.localeService.getTextValue(data.annotations?.text);
        this.dataDetail!.uri = data.selfLink?.href;
        this.dataDetail!.codelist = this.dataDetail.resourceId + '(v' + this.dataDetail.version + ')';

        this.detailForm.patchValue(this.dataDetail);
    }

    loadDetailDataOnInit(): void {
        this.loadOtherCodes();
    }

}
