import { ComplementosService } from '../../../core/services/html/complementos.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{

  public navbar: Observable<string>;

  constructor (private complementosService: ComplementosService )  {
    this.navbar = this.complementosService.getHeader();
  }


}
