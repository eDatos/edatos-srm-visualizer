import { Component, EventEmitter, Output, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeNode } from 'src/app/shared/models/tree/flat-tree-node';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { Column } from 'src/app/shared/models/table/column.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

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
    public columnsToDisplay: Column[] = [];
    public routerLink: string | undefined;

    public isAdvancedSearch: boolean = false;

    public columnsToDisplayWithExpand = [...this.columnsToDisplay.map((field: any) => {
        return field.name;
    }), 'expand'];
    public expandedElements: TreeNode[] = [];

    public treeControl = new FlatTreeControl<FlatTreeNode>(
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
            scheme: node.scheme
        };
    };

    treeFlattener = new MatTreeFlattener(
        this.transformer, node => node.level,
        node => node.expandable, node => node.children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    filters: any;

    positionFilter: FormGroup = new FormGroup({});
    reducer = (accumulator: boolean, currentValue: boolean) => accumulator && currentValue;


    constructor() {
        this.filters = {};
    }

    applyFilters(column: string, filterValue: any) {
        const filter = filterValue.value;
        this.onKeyupResource(filterValue.value, column);
    }

    @Input()
    set data(dataNodes: TreeNode[]) {
        if (dataNodes) {
            this.dataSource.data = dataNodes;
        }
    }

    @Input()
    set filterFormControl(searchForm: FormGroup) {
        if (searchForm) {
            this.positionFilter = searchForm;
        }
    }

    @Input()
    set routerLinkDetail(data: string) {
        if (data) {
            this.routerLink = data;
        }
    }

    @Input()
    set advancedSearch(isAdvancedSearch: boolean) {
        if (isAdvancedSearch != undefined) {
            this.isAdvancedSearch = isAdvancedSearch;
        }
    }

    @Input()
    set columns(columns: Column[]) {
        if (columns) {
            this.columnsToDisplay = columns;
            this.columnsToDisplayWithExpand = [...this.columnsToDisplay.map((field: any) => {
                return field.name;
            }), 'expand'];
        }
    }

    @Output() clickEvent = new EventEmitter<string>();

    @Output() keyupEvent = new EventEmitter<{ filterValue: string, column: string }>();

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
            this.onClickResource(data.urn);
        }
    }

    private onClickResource(resource: string) {
        this.clickEvent.emit(resource);
    }

    private onKeyupResource(filter: string, column: string) {
        this.keyupEvent.emit({ filterValue: filter, column: column });
    }
}


