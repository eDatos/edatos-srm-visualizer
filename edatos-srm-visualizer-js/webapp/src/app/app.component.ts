import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from './core/services/api/api.service';
import { ConfigService } from './core/services/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  
  title = 'visualizador';

  configLoaded: boolean = false;
  
  public constructor(private apiService: ApiService) {
    apiService.loadConfiguration();
  }

  public isLoadConfiguration(): boolean  {
    return ApiService.apiStructuralResource? true : false;
  }
}
