import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api/structural-resources/api.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public constructor(private apiService: ApiService) {
        apiService.loadConfiguration();
    }

    public isLoadConfiguration(): boolean {
        return !!ApiService.apiStructuralResource;
    }
    
}
