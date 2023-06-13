import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodelistsApiService } from 'src/app/core/services/api/structural-resources/codelist/codelists-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';

@Component({
    selector: 'app-codelist-detail',
    templateUrl: './codelist-detail.component.html',
    styleUrls: ['./codelist-detail.component.scss']
})
export class CodelistDetailComponent extends BasicDetailComponent implements OnInit {
    constructor(formBuilder: FormBuilder, apiService: CodelistsApiService, route: ActivatedRoute, private router: Router, localeService: LocaleService) {
        super(formBuilder, apiService, route, localeService);
        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
            version: '',
            agency: '',
            comments: ''
        });
    }

}
