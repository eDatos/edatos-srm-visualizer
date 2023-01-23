import { Component, ElementRef, OnInit } from '@angular/core';
import { ComplementosService } from 'src/app/core/services/html/complementos.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

public  footer = '';

constructor ( private elementRef : ElementRef,
  private complementosService : ComplementosService) {}
  
ngOnInit(): void {
    this.complementosService.getFooter().subscribe ( data => {
      this.footer = data.toString();
    })
  }
}
