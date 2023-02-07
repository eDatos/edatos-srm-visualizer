import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Constants } from '../../models/constants';
import { Resource } from '../../models/resources/resource.model';
import { SearchConfig } from '../../models/search-config';
import { TreeNode } from '../../models/tree/tree-node';

@Component({
  selector: 'app-basic-detail',
  templateUrl: './basic-detail.component.html',
  styleUrls: ['./basic-detail.component.scss']
})
export abstract class BasicDetailComponent implements OnInit {

  searchConfig: SearchConfig = {
    resultLimit: 20,
    resultOffset: 0,
    resultSize: 0,
    currentPage: 0
  }

  dataPathElement: string = '';
  detailForm: any;
  dataDetail: Resource | undefined;
  apiDetail!: string;

  apiChildrens: string = '';
  isDataWithChildrensTree: boolean = true;
  dataChildrensLoaded: boolean = false;
  dataChildrens: TreeNode[] = [];
  dataChildrensPath: string = '';

  constructor(public formBuilder: FormBuilder, public apiService: ApiService, public route: ActivatedRoute, public localeService: LocaleService) {

   }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')!;
    let resourceId = this.route.snapshot.paramMap.get('idScheme')!;
    let version = this.route.snapshot.paramMap.get('version')!;
    let agency = this.route.snapshot.paramMap.get('agency')!;
    let URL = this.apiDetail!
      .replace('#AGENCY#', agency)
      .replace('#RESOURCEID#', resourceId)
      .replace('#VERSION#', version)
      .replace('#ID#', id);
    this.apiService.getData(URL).subscribe((data) => {
      this.updateDataDetail(data);
      if (this.isDataWithChildrensTree) {
        this.loadChildrensTreeData()
      } else {
        URL = this.apiChildrens
        .replace('#AGENCY#', agency)
        .replace('#RESOURCEID#', resourceId)
        .replace('#VERSION#', Constants.LATEST);
        this.loadChildrenTableData(URL);
      }
    });


  }

  loadChildrensTreeData() {
    this.apiService.getData(this.apiChildrens).subscribe ((data) => {
      if (data) {
        this.updateTableChildrensTreeNode (data);
        this.dataChildrensLoaded = true;
      }
    });
  }


  loadChildrenTableData(URL: string) {
    this.dataChildrens = [];
    this.dataChildrensLoaded = false;
    this.apiService.getDataWithOffset(URL, this.searchConfig).subscribe((data) => {
      if (data) {
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

  public abstract updateTableChildrensTreeNode(data:any): void;
  public abstract updateDataDetail (data: any): void;
}
