import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';
import { TableTreeComponent } from 'src/app/shared/components/table-tree/table-tree.component';
import { Resource } from 'src/app/shared/models/resources/resource.model';

@Component({
  selector: 'app-schemes-detail',
  templateUrl: './schemes-detail.component.html',
  styleUrls: ['./schemes-detail.component.scss']
})
export class SchemesDetailComponent extends BasicDetailComponent implements OnInit {

  @ViewChild('tabletreenode') tabletreenode!: TableTreeComponent;

  constructor(formBuilder: FormBuilder, apiService: ApiService, route: ActivatedRoute, private router: Router, localeService: LocaleService) {
    super(formBuilder, apiService, route, localeService);
    // this.apiDetail = environment.apiUrlOrganizationsSchemeDetail;
    // FIXME
    //this.apiChildrens = environment.apiCoreConceptsSchemes;
    //this.dataChildrensPath = 'concept';

    // this.apiSDMX = environment.apiSDMXConceptsScheme;

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

  public updateTableChildrensTreeNode(data: any): void {
    this.tabletreenode.data = [];
    this.tabletreenode.dataSource.data = data;
    this.tabletreenode.treeControl.expandAll();
  }

  
  onLoadDetail(element: string) {
    let resource = new Resource(element);
    this.router.navigate(['concepts', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent });
  }


}




