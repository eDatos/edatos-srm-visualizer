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


  @ViewChild('tabletreenode') tabletreenode!: TableTreeComponent;
  
  constructor(formBuilder: FormBuilder, apiService: ApiService, private route: ActivatedRoute, private router: Router, private localeService: LocaleService) {
    super(formBuilder, apiService);
    this.dataPathElement = 'concept';

    this.detailForm = this.formBuilder.group({
      id: '',
      name: '',
      urn: '',
      description: ''
    })

    //this.dataChildrens = [{"name":"a11_subconcepto","id":"a11_subconcepto","urn":"urn:sdmx:org.sdmx.infomodel.conceptscheme.Concept\u003dISTAC:ORDENACION_CONCEPTOS(02.000).a11_subconcepto","children":[{"name":"a111_subconcepto","id":"a111_subconcepto","urn":"urn:sdmx:org.sdmx.infomodel.conceptscheme.Concept\u003dISTAC:ORDENACION_CONCEPTOS(02.000).a111_subconcepto","children":[],"version":"02.000"}],"version":"02.000"},{"name":"a12_subconcepto","id":"a12_subconcepto","urn":"urn:sdmx:org.sdmx.infomodel.conceptscheme.Concept\u003dISTAC:ORDENACION_CONCEPTOS(02.000).a12_subconcepto","children":[{"name":"a121","id":"a121","urn":"urn:sdmx:org.sdmx.infomodel.conceptscheme.Concept\u003dISTAC:ORDENACION_CONCEPTOS(02.000).a121","children":[],"version":"02.000"}],"version":"02.000"},{"name":"a13_subconcepto","id":"a13_subconcepto","urn":"urn:sdmx:org.sdmx.infomodel.conceptscheme.Concept\u003dISTAC:ORDENACION_CONCEPTOS(02.000).a13_subconcepto","children":[],"version":"02.000"}];


  }
 
  ngOnInit(): void {
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
        name: this.dataDetail.name
      })
    });

    URL = environment.apiUrlConcepts
      .replace('#AGENCY#', agency)
      .replace('#RESOURCEID#', resourceId)
      .replace('#VERSION#', Constants.LATEST);
      
    this.loadConceptsData(URL);

  }

  loadConceptsData (URL: string) {
    console.log('Actualizado1-1');
    //let URL = 'http://localhost:8080/structural-resources-internal-4.0.1-SNAPSHOT/apis/structural-resources-internal/v1.0/conceptschemes/~all/~all/~all/concepts?limit=100&offset=0&query=PARENT%20eq %20%27a11_subconcepto%27';
    //let URL = 'http://localhost:8081/concepts/';
    this.apiService.getData(URL).subscribe ({
      next:(data) => {
        console.log(data);
        if (data) {
          this.dataChildrens = data['concept'].map((resource: any) => {
            return {
              name: this.localeService ? this.localeService.getTextValue(resource.name.text) : '',
              id: resource.id,
              urn: resource.urn
            }
          })
        }
      },
      error: (error) => {    console.log('error');
      this.dataChildrensLoaded = true;
      },
      complete: () => {this.dataChildrensLoaded = true }
    });
      
      
      
      
      
  }

  

  onLoadDetail(element: string) {
    console.log(element);
    let resource = new Resource(element);
    this.router.navigate(['concepts', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent } );
  }



}



