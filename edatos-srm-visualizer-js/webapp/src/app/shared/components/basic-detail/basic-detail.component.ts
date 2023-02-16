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


  detailForm: any;
  dataDetail: Resource | undefined;
  apiDetail!: string;

  apiSDMX: string = '';

  apiChildrens: string = '';
  isDataWithChildrensTree: boolean = true;
  dataChildrensLoaded: boolean = false;
  dataChildrens: TreeNode[] = [];
  dataChildrensPath: string = '';

  constructor(public formBuilder: FormBuilder, public apiService: ApiService, public route: ActivatedRoute, public localeService: LocaleService) {

  }

  public abstract updateTableChildrensTreeNode(data: any): void;

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')!;
    let resourceId = this.route.snapshot.paramMap.get('resourceID')!;
    let version = this.route.snapshot.paramMap.get('version')!;
    let agency = this.route.snapshot.paramMap.get('agencyID')!;
    let URL = this.apiDetail!
      .replace('{agencyID}', agency)
      .replace('{resourceID}', resourceId)
      .replace('{version}', version)
      .replace('{id}', id);

    if (this.apiSDMX) {
      this.apiSDMX = this.apiSDMX
      .replace('{agencyID}', agency)
        .replace('{resourceID}', id)
        .replace('{version}', version);
    }
    this.apiService.getDataFromStructureResource(URL).subscribe((data) => {
      this.updateDataDetail(data);
      if (this.isDataWithChildrensTree) {
        this.apiChildrens = this.apiChildrens.replace('{urn}', this.dataDetail!.urn);
        this.loadChildrensTreeData()
      } else {
        URL = this.apiChildrens
          .replace('{agencyID}', agency)
          .replace('{resourceID}', resourceId)
          .replace('{version}', Constants.LATEST);
        this.loadChildrenTableData(URL);
      }
    });
  }

  loadChildrensTreeData() {
    this.apiService.getDataFromApiInternal(this.apiChildrens).subscribe((data) => {
      if (data) {
        this.updateTableChildrensTreeNode(data);
        this.dataChildrensLoaded = true;
      }
    });
  }

  loadChildrenTableData(URL: string) {
    this.dataChildrens = [];
    this.dataChildrensLoaded = false;
    this.apiService.getDataFromApiInternal(URL).subscribe((data) => {
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

  onDownloadSdmx() {
    this.apiService.getFile(this.apiSDMX).subscribe(blob => {
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = this.dataDetail!.id + '.xml';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  public updateDataDetail(data: any): void {
    this.dataDetail = new Resource(data.urn);
    this.dataDetail!.description = this.localeService.getTextValue(data.description?.text)
    this.dataDetail!.name = this.localeService.getTextValue(data.name?.text);
    this.detailForm.patchValue(this.dataDetail);
  }
}
