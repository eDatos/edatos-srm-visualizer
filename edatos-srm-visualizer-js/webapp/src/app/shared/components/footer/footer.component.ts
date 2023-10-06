import { Component, ElementRef, OnInit } from '@angular/core';
import { ComplementosService } from 'src/app/core/services/html/complementos.service';
import { reinsertScripts } from 'src/app/shared/utils/html-utils';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public footer: string = '';

  constructor(private complementosService: ComplementosService, private elementRef: ElementRef) {}

  ngOnInit() {
    this.complementosService.getFooter().subscribe(data => {
      this.footer = data.toString();
      setTimeout(() => {
        reinsertScripts(this.elementRef);
      });
    })
  }
}
