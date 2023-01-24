import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';
import { TableTreeComponent } from 'src/app/shared/components/table-tree/table-tree.component';
import { Constants } from 'src/app/shared/models/constants';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-concepts-schemes-detail',
  templateUrl: './concepts-schemes-detail.component.html',
  styleUrls: ['./concepts-schemes-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConceptsSchemesDetailComponent extends BasicDetailComponent implements OnInit{
  
  constructor(formBuilder: FormBuilder, apiService: ApiService, private route: ActivatedRoute, private router: Router, private localeService: LocaleService) {
    super(formBuilder, apiService);
    this.dataPathElement = 'concept';

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
 
  ngOnInit(): void {
    console.log('se ejecuta onginit');
    let id = this.route.snapshot.paramMap.get('id')!;
    let resourceId = this.route.snapshot.paramMap.get('idScheme')!;
    let version = this.route.snapshot.paramMap.get('version')!;
    let agency = this.route.snapshot.paramMap.get('agency')!;

    let URL = environment.apiUrlConceptsSchemeDetail
      .replace('#AGENCY#', agency)
      .replace('#RESOURCEID#', resourceId)
      .replace('#VERSION#', version)
      .replace('#ID#', id);

    this.apiService.getData(URL).subscribe((data) => {
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
    });

    URL = environment.apiUrlConcepts
      .replace('#AGENCY#', agency)
      .replace('#RESOURCEID#', resourceId)
      .replace('#VERSION#', Constants.LATEST);
      
    this.loadConceptsData(URL);

  }

  loadConceptsData (URL: string) {
    this.dataChildrens = [];
    this.dataChildrensLoaded = false;
    this.apiService.getDataWithOffset(URL, this.searchConfig).subscribe ((data) => {
        if (data) {
          this.dataChildrensPath = 'concept';
          this.dataChildrens = data[this.dataChildrensPath].map((resource: any) => {
            return {
              name: this.localeService ? this.localeService.getTextValue(resource.name.text) : '',
              id: resource.id,
              urn: resource.urn,
              version: resource.version,
            }
          })
        }
        this.dataChildrensLoaded = true;
      }); 
  }

  onLoadDetail(element: string) {
    console.log(element);
    let resource = new Resource(element);
    this.router.navigate(['concepts', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent } );
  }

}



