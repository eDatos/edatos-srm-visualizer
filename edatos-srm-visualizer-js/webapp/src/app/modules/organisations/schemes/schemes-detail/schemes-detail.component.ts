import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';
import {
    OrganisationsSchemeApiService
} from 'src/app/core/services/api/structural-resources/organisations/organisations-scheme-api.service';

@Component({
    selector: 'app-schemes-detail',
    templateUrl: './schemes-detail.component.html',
    styleUrls: ['./schemes-detail.component.scss'],
})
export class SchemesDetailComponent extends BasicDetailComponent implements OnInit {
    constructor(formBuilder: FormBuilder, apiService: OrganisationsSchemeApiService, route: ActivatedRoute, private router: Router, localeService: LocaleService) {
        super(formBuilder, apiService, route, localeService);

        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
            version: '',
            agency: '',
            comments: '',
        });
    }
}
