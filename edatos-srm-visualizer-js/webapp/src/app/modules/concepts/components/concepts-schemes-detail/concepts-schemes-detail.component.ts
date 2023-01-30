import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';
import { Constants } from 'src/app/shared/models/constants';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-concepts-schemes-detail',
  templateUrl: './concepts-schemes-detail.component.html',
  styleUrls: ['./concepts-schemes-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConceptsSchemesDetailComponent extends BasicDetailComponent implements OnInit {


  constructor(formBuilder: FormBuilder, apiService: ApiService, route: ActivatedRoute, private router: Router, localeService: LocaleService) {
    super(formBuilder, apiService, route, localeService);
    this.dataPathElement = 'concept';
    this.apiDetail = environment.apiUrlConceptsSchemeDetail;
    this.apiChildrens = environment.apiUrlConcepts;
    this.dataChildrensPath = 'concept';

    this.detailForm = this.formBuilder.group({
      id: '',
      name: '',
      urn: '',
      description: '',
      version: '',
      agency: '',
      comments: ''
    })
  }

  public updateDataDetail(data: any): void {
    this.dataDetail = new Resource(data.urn);
    this.dataDetail!.description = this.localeService.getTextValue(data.description?.text)
    this.dataDetail!.name = this.localeService.getTextValue(data.name?.text);
    this.detailForm.patchValue({
      id: this.dataDetail.id,
      urn: this.dataDetail.urn,
      name: this.dataDetail.name,
      version: this.dataDetail.version,
      agency: this.dataDetail.agency
    })
  }

  public updateTableChildrensTreeNode(data: any): void {
    throw new Error('Method not implemented.');
  }
  
  onLoadDetail(element: string) {
    let resource = new Resource(element);
    this.router.navigate(['concepts', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent });
  }

}



