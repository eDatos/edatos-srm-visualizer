import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeSearchComponent } from 'src/app/shared/components/basic-search/basic-tree-search.component';
import {OrganisationsSchemeApiService} from "src/app/core/services/api/structural-resources/organisations/organisations-scheme-api.service";
import { TranslateService } from '@ngx-translate/core';
import { OrganisationResource } from '../../../../shared/models/resources/organisation-resource.model';

@Component({
    selector: 'app-schemes-search',
    templateUrl: './schemes-search.component.html',
    styleUrls: ['./schemes-search.component.scss'],
})
export class SchemesSearchComponent extends BasicTreeSearchComponent implements OnInit {

    constructor(protected override formBuilder: FormBuilder, protected override apiService: OrganisationsSchemeApiService,
                protected override translateService: TranslateService, protected override localeService: LocaleService) {
        super(apiService, formBuilder, translateService, localeService);

        this.searchForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
        });

        this.detailForm = this.formBuilder.group({ // TODO This attribute should be REMOVED when the list has been adapted to the new design
            id: '',
            name: '',
            urn: '',
            description: '',
            version: '',
            scheme: '',
        });

        this.fields = [
            { name: this.translateService.instant('resourceParameters.identifier'), value: 'id' },
            { name: this.translateService.instant('resourceParameters.name'), value: 'name' },
            { name: this.translateService.instant('resourceParameters.maintainer'), value: 'maintainer' }
        ];

        this.selectedDefault = this.fields.map(field => field);
        this.searchSimpleForm = this.formBuilder.group({
            filter: '',
            selectedFields:  [this.selectedDefault],
            showAllVersions: [false],
        });
    }
    ngOnInit(): void {
        this.loadInitialData();
    }

    public onLoadOrganisationSchemeDetail(urn: string): void {
        this.dataDetail = new OrganisationResource(urn);
        this.apiService.getDetailFromStructureResource(this.dataDetail).subscribe((data) => {
            (this.dataDetail!.description = this.localeService ? this.localeService.getTextValue(data.description?.text) : ' ');
            (this.dataDetail!.name = this.localeService ? this.localeService.getTextValue(data.name?.text) : ' ');
            this.detailForm.patchValue(this.dataDetail);
        });

        this.routerLinkDetail = this.dataDetail?.agency + '/' + this.dataDetail?.resourceId + '/'
             + this.dataDetail?.version + '/detail';
    }

}
