import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeNode } from 'src/app/shared/models/tree/flat-tree-node';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { Column } from 'src/app/shared/models/table/column.model';
import { ErrorService } from '../../../core/services/error/error.service';

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
export class TableExpandableRows implements OnInit{
    public columnsToDisplay: Column[] = [];
    public routerLink: string | undefined;

    public copied: boolean = false;
    public apiError: boolean = false;
    public dataLoaded: boolean = false;

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
            scheme: node.scheme,
            concept: node.concept,
            typeDimension: node.typeDimension,
            assigmentStatus: node.assigmentStatus,
            attributeRelationship: node.attributeRelationship,
            localRepresentation: node.localRepresentation
        };
    };

    treeFlattener = new MatTreeFlattener(
        this.transformer, node => node.level,
        node => node.expandable, node => node.children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    reducer = (accumulator: boolean, currentValue: boolean) => accumulator && currentValue;

    constructor(private errorService: ErrorService) {}

    ngOnInit() {
        this.errorService.getErrorStatus().subscribe((status) => {
            this.apiError = status !== null;
            this.dataLoaded = status !== null;
        });
    }

    applyFilters(column: string, filterValue: any) {
        this.onKeyupResource(filterValue.value, column);
    }

    @Input()
    set data(dataNodes: TreeNode[]) {
        if (dataNodes) {
            this.dataSource.data = dataNodes;
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

    public openSelfLink(selfLink: string) {
        window.open(selfLink, '_blank');
    }

    public onCopySuccess() {
        this.copied = true;
        setTimeout(() => {
            this.copied = false;
        }, 3000);
    }

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


