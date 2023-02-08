import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-navbar',
  templateUrl: './categories-navbar.component.html',
  styleUrls: ['./categories-navbar.component.scss']
})
export class CategoriesNavbarComponent {
  constructor(private router: Router) {};
  
  isRouteActive(element: string) {
    return this.router.url.includes('/categories/' + element);
  }
   
}
