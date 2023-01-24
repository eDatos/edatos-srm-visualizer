import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Resource } from '../../models/resources/resource.model';
import { SearchConfig } from '../../models/search-config';
import { TreeNode } from '../../models/tree/tree-node';

@Component({
  selector: 'app-basic-detail',
  templateUrl: './basic-detail.component.html',
  styleUrls: ['./basic-detail.component.scss']
})
export class BasicDetailComponent {

  searchConfig: SearchConfig = {
    resultLimit: 20,
    resultOffset: 0,
    resultSize: 0,
    currentPage: 0
  }

  dataPathElement: string = '';
  detailForm: any;
  dataDetail: Resource | undefined;
  apiDetail: string | undefined;

  dataChildrensLoaded: boolean = false;
  dataChildrens: TreeNode[] = [];
  dataChildrensPath: string = '';

  constructor(public formBuilder: FormBuilder, public apiService: ApiService) { }

}
