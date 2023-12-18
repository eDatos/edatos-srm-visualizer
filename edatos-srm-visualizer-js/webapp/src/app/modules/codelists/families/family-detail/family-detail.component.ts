import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    CodelistFamiliesApiService
} from 'src/app/core/services/api/structural-resources/codelist/codelist-families-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';
import { Observable } from 'rxjs/internal/Observable';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';

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
                protected override route: ActivatedRoute, protected override router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService) {
        super(formBuilder, apiSrmService, route, localeService, translateService, router);
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
            { name: this.translateService.instant('codelists.parameters.id'), value: 'id' },
            { name: this.translateService.instant('codelists.parameters.name'), value: 'name' },
            { name: this.translateService.instant('codelists.parameters.maintainer'), value: 'maintainer' }
        ];
    }

    loadDetailData(): void {
        this.loadDataDetailResource(this.dataDetail).subscribe(data => {
            this.dataDetail = data;
            this.detailForm.patchValue(this.dataDetail);
            this.loadFamilyCodelist()
        });
    }

    private loadDataDetailResource(data: any): Observable<CodelistResource> {
        return this.apiSrmService.getDataDetailFamilyCodelistResourceFromSrm(data);
    }

    private loadFamilyCodelist(): void {
        this.apiSrmService.loadFamilyCodelist(this.dataDetail.urn).subscribe((data) => {
            if (data[this.apiSrmService.apiCodelistDataPath]) {
                const resources = data[this.apiSrmService.apiCodelistDataPath];
                this.apiSrmService.findAllRelatedCodelistDetailsFromSrm(resources, true).subscribe((codelist) => {
                    this.familyCodelist = codelist;
                    this.tableExpandable.dataLoaded = true;
                });
            }
        });
    }

    public override onReturn() {
        this.router.navigate(['families'], { relativeTo: this.route.parent });
    }

    public onLoadFamilyCodelistDetail(urn: string): void {
        const codelist = new CodelistResource(urn);
        if (codelist) {
            if (!this.tableExpandable.navigate) {
                this.routerLinkDetail = `/codelists/codelists/${codelist.agency}/${codelist.resourceId}/${codelist.version}/detail`;
            } else {
                this.router.navigate(['codelists', codelist.agency, codelist.resourceId, codelist.version, 'detail'], { relativeTo: this.route.parent });
            }
        }
    }

}
