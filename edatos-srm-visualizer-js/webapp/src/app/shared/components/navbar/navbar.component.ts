import { ComplementosService } from '../../../core/services/html/complementos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  public navbar = '';

  constructor (private complementosService: ComplementosService )
  {}

  ngOnInit(): void {
    this.complementosService.getHeader().subscribe ( data => {
      this.navbar = data.toString();
    })
  }

}
