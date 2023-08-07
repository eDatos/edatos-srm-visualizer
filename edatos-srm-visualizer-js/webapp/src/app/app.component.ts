import { Component, OnInit } from '@angular/core';
import { ApiSrmService } from './core/services/api/structural-resources/api-srm.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public constructor(private apiService: ApiSrmService) {
        apiService.loadConfiguration();
    }

    public isLoadConfiguration(): boolean {
        return !!ApiSrmService.apiStructuralResource;
    }
    
}
