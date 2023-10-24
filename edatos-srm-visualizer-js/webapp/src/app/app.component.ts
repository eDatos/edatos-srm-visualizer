import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ApiSrmService } from './core/services/api/structural-resources/api-srm.service';
import { ConfigService} from './core/services/config/config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public favIcon: any;

    public constructor(private apiService: ApiSrmService, private configService: ConfigService, 
                       @Inject(DOCUMENT) private document: Document, protected translateService: TranslateService) {
        
        apiService.loadConfiguration();
        translateService.get('title').subscribe((translation) => document.title = translation);
        this.favIcon = document.querySelector('#appFavicon');
        configService.getFaviconUrl().subscribe(url => {
            if (this.favIcon) {
                this.favIcon.href = url;
            }
        });
    
    }

    public isLoadConfiguration(): boolean {
        return !!ApiSrmService.apiStructuralResource;
    }
    
}
