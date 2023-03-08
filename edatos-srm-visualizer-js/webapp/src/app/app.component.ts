import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from './core/services/api/structural-resources/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'Visualizador';
  public static appName = 'Visualizador';

  configLoaded: boolean = false;
  
  public constructor(private apiService: ApiService) {
    apiService.loadConfiguration();
  }

  public isLoadConfiguration(): boolean  {
    return ApiService.apiStructuralResource? true : false;
  }
}
