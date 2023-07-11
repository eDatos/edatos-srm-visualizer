import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { FlatTreeNode } from 'src/app/shared/models/tree/flat-tree-node';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';


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
            id: node.id,
            description: node.description,
            selfLink: node.selfLink,
            maintainer: node.maintainer,
            codelist: node.codelist,
        };
    };

    treeFlattener = new MatTreeFlattener(
        this.transformer, node => node.level,
        node => node.expandable, node => node.children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    constructor(private apiService: ApiService, private localeService: LocaleService) {
    }


    onClickResource(resource: string) {
        this.clickEvent.emit(resource);
    }

    hasChild = (_: number, node: FlatTreeNode) => node.expandable;
}  
