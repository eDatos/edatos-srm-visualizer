import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConceptsSchemeApiService } from 'src/app/core/services/api/structural-resources/concepts/concepts-scheme-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeDetailComponent } from 'src/app/shared/components/basic-tree-detail/basic-tree-detail.component';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-concepts-schemes-detail',
    templateUrl: './concepts-schemes-detail.component.html',
    styleUrls: ['./concepts-schemes-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConceptsSchemesDetailComponent extends BasicTreeDetailComponent implements OnInit {
    constructor(protected override formBuilder: FormBuilder, protected override apiService: ConceptsSchemeApiService,
                protected override route: ActivatedRoute, private router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService) {
        super(formBuilder, apiService, route, localeService, translateService);
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

    public loadAllVersionsFromResource(): void {}
}
