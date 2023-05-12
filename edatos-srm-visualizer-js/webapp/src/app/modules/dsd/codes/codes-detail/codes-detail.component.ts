import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DsdApiService } from 'src/app/core/services/api/structural-resources/dsd-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';
import { Resource } from 'src/app/shared/models/resources/resource.model';

@Component({
    selector: 'app-codes-detail',
    templateUrl: './codes-detail.component.html',
    styleUrls: ['./codes-detail.component.scss'],
})
export class CodesDetailComponent extends BasicDetailComponent implements OnInit {
    constructor(formBuilder: FormBuilder, apiService: DsdApiService, route: ActivatedRoute, private router: Router, localeService: LocaleService) {
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

    onLoadDetail(element: string) {
        let resource = new Resource(element);
        this.router.navigate(['datastructures', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent });
    }
}
