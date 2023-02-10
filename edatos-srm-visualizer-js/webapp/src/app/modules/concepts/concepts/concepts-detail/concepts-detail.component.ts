import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(formBuilder: FormBuilder, apiService: ApiService, private router: Router, route: ActivatedRoute, localeService: LocaleService) {
    super(formBuilder, apiService, route, localeService);
    this.apiDetail =  environment.apiUrlConceptDetail;
    this.apiChildrens = environment.apiCoreConcepts;
    this.detailForm = this.formBuilder.group({
      id: '',
      name: '',
      urn: '',
      description: ''
    })
    /*   route.params.subscribe(params => {
         this.loadDetail();
       }) */
  }

  public updateTableChildrensTreeNode(data: any): void {
    this.tabletreenode.data = [];
    this.tabletreenode.dataSource.data = data;
    this.tabletreenode.treeControl.expandAll();
  }



  onClickChildren(element: string) {
    let resource = new Resource(element);
    this.router.navigate(['concepts', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent });
  }
}
