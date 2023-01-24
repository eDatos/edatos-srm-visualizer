import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';
import { TableTreeComponent } from 'src/app/shared/components/table-tree/table-tree.component';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-concepts-detail',
  templateUrl: './concepts-detail.component.html',
  styleUrls: ['./concepts-detail.component.scss']
})
export class ConceptsDetailComponent extends BasicDetailComponent {
  
  @ViewChild('tabletreenode') tabletreenode!: TableTreeComponent;

  constructor(formBuilder: FormBuilder, apiService: ApiService, private router: Router, private route: ActivatedRoute, private localeService: LocaleService) {
    super(formBuilder, apiService);
    this.dataPathElement = 'concept';

    this.detailForm = this.formBuilder.group({
      id: '',
      name: '',
      urn: '',
      description: ''
    })
    route.params.subscribe(params => {
      this.loadDetail();
    })
  }

  loadTreeData () {
    //let URL = 'http://localhost:8080/structural-resources-internal-4.0.1-SNAPSHOT/apis/structural-resources-internal/v1.0/conceptschemes/~all/~all/~all/concepts?limit=100&offset=0&query=PARENT%20eq %20%27a11_subconcepto%27';
    let URL = 'http://https://estadisticas.arte-consultores.com/edatos-srm-visualizer/concepts/'.concat(this.dataDetail!.urn);
    console.log(URL);
    this.apiService.getData(URL).subscribe ((data) => {
      if (data) {
        this.tabletreenode.data = [];
        this.tabletreenode.dataSource.data = data;
        this.tabletreenode.treeControl.expandAll();
        this.dataChildrensLoaded = true;
      }
    });
  }
  
  onClickChildren(element: string) {
    let resource = new Resource(element);
    this.router.navigate(['concepts', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent } );
  }
  
  
  loadDetail(): void {
    let id = this.route.snapshot.paramMap.get('id')!;
    let resourceId = this.route.snapshot.paramMap.get('idScheme')!;
    let version = this.route.snapshot.paramMap.get('version')!;
    let agency = this.route.snapshot.paramMap.get('agency')!;

    let URL = environment.apiUrlConceptDetail
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
      });
      this.loadTreeData();
    });
  }
}
