import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    CodelistFamiliesApiService
} from 'src/app/core/services/api/structural-resources/codelist/codelist-families-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-tree-detail/basic-detail.component';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';

@Component({
    selector: 'app-family-detail',
    templateUrl: './family-detail.component.html',
    styleUrls: ['./family-detail.component.scss']
})
export class FamilyDetailComponent extends BasicDetailComponent implements OnInit {

    public navLinks: MenuItem[];
    public activeLink: MenuItem;

    public familyCodelist: CodelistResource[] = [];

    constructor(protected override formBuilder: FormBuilder, protected override apiSrmService: CodelistFamiliesApiService,
                protected override route: ActivatedRoute, private router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService) {
        super(formBuilder, apiSrmService, route, localeService, translateService);
        this.showChildrenTree = true;
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

        this.isMapperWithMaintainer = false;
        this.isDataWithChildrenTree = false;
    }

    loadAllVersionsFromResource(): void {}

    loadDetailDataOnInit(): void {
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
    }

    mapperDataResourceDetail(data: any): void {
        this.dataDetail = new CodelistResource(data.urn);
        this.getDetailForm();
    }

    updateTableChildrenTreeNode(data: any): void {}

}
