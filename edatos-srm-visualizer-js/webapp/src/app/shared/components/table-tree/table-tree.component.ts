import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { FlatTreeNode } from 'src/app/shared/models/tree/flat-tree-node';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { ErrorService } from '../../../core/services/error/error.service';


@Component({
    selector: 'app-table-tree',
    templateUrl: './table-tree.component.html',
    styleUrls: ['./table-tree.component.scss']
})
export class TableTreeComponent implements OnInit{

    public dataLoaded: boolean = false;
    public apiError: boolean = false;

    @Input()
    displayedColumns: string[] = ['name', 'id'];

    @Input()
    set data(dataNodes: TreeNode[]) {
        if (dataNodes) {
            this.dataSource.data = dataNodes;
        }
    }

    @Input()
    set loaded(dataLoaded: boolean) {
        if (dataLoaded) {
            this.dataLoaded= dataLoaded;
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
            scheme: node.scheme,
            concept: node.concept,
            typeDimension: node.typeDimension,
            assigmentStatus: node.assigmentStatus,
            attributeRelationship: node.attributeRelationship
        };
    };

    treeFlattener = new MatTreeFlattener(
        this.transformer, node => node.level,
        node => node.expandable, node => node.children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    constructor(private errorService: ErrorService) {}

    ngOnInit() {
        this.errorService.getErrorStatus().subscribe((status) => {
            this.apiError = status !== null;
            this.dataLoaded = status !== null;
        });
    }

    loadResource(resource: FlatTreeNode) {
        this.clickEvent.emit(resource.urn);
    }

    hasChild = (_: number, node: FlatTreeNode) => node.expandable;

}  
