import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    CodelistCodesApiService
} from 'src/app/core/services/api/structural-resources/codelist/codelist-codes-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';
import { BasicDetailComponent } from '../../../../shared/components/basic-detail/basic-detail.component';
import { Observable } from 'rxjs/internal/Observable';
import { TreeNode } from '../../../../shared/models/tree/tree-node';

@Component({
    selector: 'app-code-detail',
    templateUrl: './code-detail.component.html',
    styleUrls: ['./code-detail.component.scss']
})
export class CodeDetailComponent extends BasicDetailComponent implements OnInit {

    public navLinks: MenuItem[];
    public activeLink: MenuItem;

    public otherCodes: TreeNode[] = [];
    public equivalentCodes: TreeNode[] = [];

    constructor(protected override formBuilder: FormBuilder, protected override apiSrmService: CodelistCodesApiService,
                protected override route: ActivatedRoute, private router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService) {
        super(formBuilder, apiSrmService, route, localeService, translateService);

        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
            version: '',
            maintainer: '',
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

    loadDetailData(): void {
        this.loadDataDetailResource(this.dataDetail).subscribe(data => {
            this.dataDetail = data;
            this.detailForm.patchValue(this.dataDetail);
            this.loadOtherCodes();
        });
    }

    public onActiveItemChange(event: any) {
        this.activeLink = event;
    }

    private loadDataDetailResource(data: any): Observable<CodelistResource> {
        return this.apiSrmService.getDataDetailCodelistResourceFromSrm(data, this.translateService, true);
    }

    private loadOtherCodes(): void {
        this.apiSrmService.loadOtherCodes(this.dataDetail).subscribe((data) => {
            if (data[this.apiSrmService.apiSearchDataPath]) {
                const resources = data[this.apiSrmService.apiSearchDataPath];
                this.apiSrmService.findAllOtherCodesDetailsFromSrm(resources, true).subscribe((data) => {
                    this.otherCodes = data;
                    this.dataChildrenLoaded = true;
                });
            }
        });
    }

}
