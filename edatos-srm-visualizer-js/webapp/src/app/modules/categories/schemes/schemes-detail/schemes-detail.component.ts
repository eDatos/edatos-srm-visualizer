import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocaleService } from 'src/app/core/services/locale.service';
import { TableTreeComponent } from 'src/app/shared/components/table-tree/table-tree.component';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import {
    CategoriesSchemeApiService
} from 'src/app/core/services/api/structural-resources/categories/categories-scheme-api.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';

@Component({
    selector: 'app-schemes-detail',
    templateUrl: './schemes-detail.component.html',
    styleUrls: ['./schemes-detail.component.scss'],
})
export class SchemesDetailComponent extends BasicDetailComponent implements OnInit {
    constructor(formBuilder: FormBuilder, apiService: CategoriesSchemeApiService, route: ActivatedRoute, private router: Router, localeService: LocaleService) {
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
