import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComplementosService } from 'src/app/core/services/html/complementos.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public footer: Observable<string>;

  constructor(private complementosService: ComplementosService) {
    this.footer = this.complementosService.getFooter();
  }

}
