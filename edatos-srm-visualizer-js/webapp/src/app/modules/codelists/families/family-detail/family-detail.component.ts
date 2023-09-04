import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    CodelistFamiliesApiService
} from 'src/app/core/services/api/structural-resources/codelist/codelist-families-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';
import { Observable } from 'rxjs/internal/Observable';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';

@Component({
    selector: 'app-family-detail',
    templateUrl: './family-detail.component.html',
    styleUrls: ['./family-detail.component.scss']
})
export class FamilyDetailComponent extends BasicDetailComponent implements OnInit {

    public navLinks: MenuItem[];
    public activeLink: MenuItem;

    public familyCodelist: TreeNode[] = [];
    public columns: any[];
    public routerLinkDetail: string = '';

    constructor(protected override formBuilder: FormBuilder, protected override apiSrmService: CodelistFamiliesApiService,
                protected override route: ActivatedRoute, private router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService) {
        super(formBuilder, apiSrmService, route, localeService, translateService);
        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            uri: '',
            lastUpdatedDate: '',
        });

        this.navLinks = [
            {
                label: this.translateService.instant('codelists.familyCodelist')
            }
        ];

        this.activeLink = this.navLinks[0];

        this.columns = [
            { name: this.translateService.instant('codelists.parameters.code'), value: 'id' },
            { name: this.translateService.instant('codelists.parameters.parentCode'), value: 'name' },
            { name: this.translateService.instant('codelists.parameters.agency'), value: 'agency' }
        ];
    }

    loadDetailData(): void {
        this.loadDataDetailResource(this.dataDetail).subscribe(data => {
            this.dataDetail = data;
            this.detailForm.patchValue(this.dataDetail);
            this.dataChildrenLoaded = true;
        });
    }

    private loadDataDetailResource(data: any): Observable<CodelistResource> {
        return this.apiSrmService.getDataDetailFamilyCodelistResourceFromSrm(data);
    }

        // TODO - pending development modification in SRM project
     /*   this.apiService.loadFamilyCodelist(this.dataDetail.urn).subscribe((data) => {
            if (data[this.apiService.apiSearchDataPath]) {
                data[this.apiService.apiSearchDataPath].forEach((codelist: any) => {
                    const resource = new CodelistResource(codelist.urn);
                    resource.id = codelist.id;
                    resource.name = this.localeService.getTextValue(codelist.name?.text);
                    resource.agency = codelist.agency;
                    this.familyCodelist.push(resource);
                });
                this.dataChildrenLoaded = true;
            }
        });
        
      */

    public onLoadFamilyCodelistDetail(urn: string): void {
        /**TODO */
    }

}
