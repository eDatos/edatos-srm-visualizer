    import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
    import { animate, state, style, transition, trigger } from '@angular/animations';
    import { FlatTreeControl } from '@angular/cdk/tree';
    import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
    import { FormBuilder, FormGroup } from '@angular/forms';
    import { FlatTreeNode } from 'src/app/shared/models/tree/flat-tree-node';
    import { TreeNode } from 'src/app/shared/models/tree/tree-node';
    import { Column } from 'src/app/shared/models/table/column.model';
    import { SortConfig } from 'src/app/shared/models/sort-config';
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
    export class TableExpandableRows implements OnInit {

        @Input() set loading(value: boolean) {
            this.dataLoaded = !value;
        }

        public columnsToDisplay: Column[] = [];
        public filteredValues: any[] = [];
        public options: any = {
            'maintainer': [],
            'recommended': []
        };
        public routerLink: string | undefined;
        public representationRouterLink: string | undefined;
        public columnToSort: SortConfig = {
            columnName: "",
            sortOrder: ""
        };

        public copied: boolean = false;
        public apiError: boolean = false;
        public dataLoaded: boolean = false;

        public searchAdvancedForm: FormGroup = new FormBuilder().group({
            id: null,
            name: null,
            urn: null,
            description: null,
            scheme: null,
            schemeId: null,
            schemeName: null,
            maintainer: null,
            recommended: null
        });

        public isAdvancedSearch: boolean = false;
        public showRecommendedFilter: boolean = true;

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
                schemeId: node.schemeId,
                schemeName: node.schemeName,
                concept: node.concept,
                typeDimension: node.typeDimension,
                assigmentStatus: node.assigmentStatus,
                attributeRelationship: node.attributeRelationship,
                localRepresentation: node.localRepresentation,
                recommended: node.recommended
            };
        };

        treeFlattener = new MatTreeFlattener(
            this.transformer, node => node.level,
            node => node.expandable, node => node.children);

        dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener as any);

        reducer = (accumulator: boolean, currentValue: boolean) => accumulator && currentValue;

        constructor(private errorService: ErrorService) {}

        ngOnInit() {
            this.errorService.getErrorStatus().subscribe((status) => {
                this.apiError = status !== null;
                this.dataLoaded = status !== null;
            });
        }

        applyFilters(column: string, filterValue: any) {
            this.onKeyupResource(filterValue?.value ? filterValue.value : null, column);
        }

        selectValue(column: string, value: any) {
            this.onSelectValue(value, column);
        }

        clearValue(column: string) {
            this.onSelectValue(null, column);
        }

        filterValue(column: string, event: any) {
            let filtered: any[] = [];
            let query = event.query;

            for (let i = 0; i < this.options[column].length; i++) {
                let value = this.options[column][i];
                if (value.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    filtered.push(value);
                }
            }
            this.filteredValues = filtered;
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

        @Input() set routerLinkLocalRepresentation(data: string) {
            if (data) {
                this.representationRouterLink = data;
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

        @Output() sortColumnEvent =  new EventEmitter<{ sortOrder: string, column: string }>();

        @Output() selectEvent =  new EventEmitter<{ filterValue: any, column: string }>();

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

        public isSortableColumn(column: any) {
            return this.columnsToDisplay.filter((field: any) => field.value === column)[0].sortable;
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
                if (data.localRepresentation?.id) {
                    this.onClickResource(data.localRepresentation);
                }
            }
        }

        public toggleSortOrder(column: string) {
            if (this.columnToSort.columnName === column) {
                this.columnToSort.sortOrder = this.columnToSort.sortOrder === 'ASC' ? 'DESC' : 'ASC';
            } else {
                this.columnToSort = {
                    columnName: column,
                    sortOrder: 'ASC'
                }
            }
            this.onClickSortColumn(this.columnToSort.sortOrder, this.columnToSort.columnName);
        }

        public getSortOrderColumn (column: string): string {
            if (this.columnToSort.columnName !== column) {
                return 'fa-thin fa-arrow-down-arrow-up';
            } else {
                return this.columnToSort.sortOrder === 'ASC' ?
                    'fa-thin fa-arrow-down-short-wide' : 'fa-thin fa-arrow-up-short-wide';
            }
        }

        public onClickResource(resource: string) {
            this.clickEvent.emit(resource);
        }

        private onKeyupResource(filter: string, column: string) {
            this.keyupEvent.emit({ filterValue: filter, column: column });
        }

        public onClickSortColumn(order: string, column: string) {
            this.sortColumnEvent.emit({ sortOrder: order, column: column });
        }

        public onSelectValue(value: any, column: string) {
            this.selectEvent.emit({ filterValue: value, column: column });
        }

    }


