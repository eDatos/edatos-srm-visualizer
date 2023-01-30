import { Component, Inject, OnInit } from '@angular/core';
import { ConfigService } from './core/services/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  
  title = 'visualizador';
  
  public constructor(private config: ConfigService) {

  }
}
