import { ComplementosService } from '../../../core/services/html/complementos.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  public navbar: any;

  constructor (private complementosService: ComplementosService )  {
    
  }
  ngOnInit(): void {
    this.navbar = this.complementosService.getHeader();
  }


}
