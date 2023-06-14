import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConceptsSchemeApiService } from 'src/app/core/services/api/structural-resources/concepts/concepts-scheme-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeDetailComponent } from 'src/app/shared/components/basic-tree-detail/basic-tree-detail.component';
import { Resource } from 'src/app/shared/models/resources/resource.model';

@Component({
    selector: 'app-concepts-schemes-detail',
    templateUrl: './concepts-schemes-detail.component.html',
    styleUrls: ['./concepts-schemes-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConceptsSchemesDetailComponent extends BasicTreeDetailComponent implements OnInit {
    constructor(formBuilder: FormBuilder, apiService: ConceptsSchemeApiService, route: ActivatedRoute, private router: Router, localeService: LocaleService) {
        super(formBuilder, apiService, route, localeService);
        this.showChildrenTree = true;
        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
            version: '',
            agency: '',
            comments: '',
        });
    }

    public updateTableChildrenTreeNode(data: any): void {
        this.tabletreenode.data = [];
        this.tabletreenode.dataSource.data = data;
        this.tabletreenode.treeControl.expandAll();
    }

    onLoadDetail(element: string) {
        let resource = new Resource(element);
        // FIXME
        this.router.navigate(['concepts', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent });
    }
}
