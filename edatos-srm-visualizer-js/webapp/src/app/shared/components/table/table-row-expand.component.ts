import { Component, EventEmitter, Output, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeNode } from 'src/app/shared/models/tree/flat-tree-node';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';

@Component({
    selector: 'table-expandable-rows',
    styleUrls: ['table-row-expand.component.scss'],
    templateUrl: 'table-row-expand.component.html',
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ]
})
export class TableExpandableRows {
    columnsToDisplay = ['name', 'id'];
    columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    expandedElements: TreeNode[] = [];

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
            selfLink: node.selfLink
        };
    };

    treeFlattener = new MatTreeFlattener(
        this.transformer, node => node.level,
        node => node.expandable, node => node.children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    @Input()
    set data(dataNodes: TreeNode[]) {
        if (dataNodes) {
            this.dataSource.data = dataNodes;
        }
    }

    @Output() clickEvent = new EventEmitter<string>();

    onClickResource(resource: string) {
        this.clickEvent.emit(resource);
    }

    hasChild = (_: number, node: FlatTreeNode) => node.expandable;

    public isRowExpanded(data: any): boolean {
        return this.expandedElements.includes(data);
    }

    public collapseRow(data: any): void {
        const index = this.expandedElements.indexOf(data);
        if (index > -1) {
            this.expandedElements.splice(index, 1);
        }
    }

    public expandRow(data: any): void {
        if (!this.isRowExpanded(data)) {
            this.expandedElements.push(data);
        }
    }

    public toggleRow(data: any): void {
        if (this.isRowExpanded(data)) {
            this.collapseRow(data);
        } else {
            this.expandRow(data);
        }
    }
}


