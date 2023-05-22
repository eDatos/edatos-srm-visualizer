import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api/structural-resources/api.service';
import { DEFAULT_TITLE } from './app.constants';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = DEFAULT_TITLE;
    public static appName = DEFAULT_TITLE;

    configLoaded: boolean = false;

    public constructor(private apiService: ApiService,  private router: Router) {
        apiService.loadConfiguration();
    }

    public isLoadConfiguration(): boolean {
        return !!ApiService.apiStructuralResource;
    }

    ngOnInit(): void {
    }
}
