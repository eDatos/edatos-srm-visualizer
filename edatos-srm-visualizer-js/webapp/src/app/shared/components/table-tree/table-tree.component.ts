import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Resource } from '../../models/resources/resource.model';
import { FlatTreeNode } from '../../models/tree/flat-tree-node';
import { TreeNode } from '../../models/tree/tree-node';


@Component({
  selector: 'app-table-tree',
  templateUrl: './table-tree.component.html',
  styleUrls: ['./table-tree.component.scss']
})
export class TableTreeComponent {

  @Input()
  displayedColumns: string[] = ['name', 'id'];

  @Input()
  set data(dataNodes: TreeNode[]) {
    if (dataNodes) {
      this.dataSource.data = dataNodes;
    }
  }

  @Output() clickEvent = new EventEmitter<string>();

  treeControl = new FlatTreeControl<FlatTreeNode>(
    node => node.level, node => node.expandable);

  private transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      count: node.count,
      level: level,
      urn: node.urn,
      id: node.id
    };
  }

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level,
    node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private apiService: ApiService, private localeService: LocaleService) {
  }


  getChildrens(node : TreeNode) {

    node.children = [ {
      name: 'name',
      id: 'id',
            urn: 'urn',
            version: '1.0',
            urlChildrens: ''
    }]
    let URL = 'http://localhost:8080/structural-resources-internal-4.0.1-SNAPSHOT/apis/structural-resources-internal/v1.0/conceptschemes/~all/~all/~all/concepts?limit=100&offset=0&query=PARENT%20eq %20%27a11_subconcepto%27';
    this.apiService.getData(URL).subscribe(data => {
      if (data.total > 0) {
        node.children = data.concept.map ((element: any) => {
          let resource = new Resource(element.urn);
          resource.name = this.localeService ? this.localeService.getTextValue(element.name.text) : '';
          return {
            name: resource.name,
            id: resource.id,
            urn: resource.urn,
            version: resource.version,
            urlChildrens: URL.concat(this.apiService.addURLParamt('PARENT', resource.id, ''))
          }
        });
      }
    })
  }

  onClickResource(resource: string) {
    this.clickEvent.emit(resource);
  }

  hasChild = (_: number, node: FlatTreeNode) => node.expandable;
}  
