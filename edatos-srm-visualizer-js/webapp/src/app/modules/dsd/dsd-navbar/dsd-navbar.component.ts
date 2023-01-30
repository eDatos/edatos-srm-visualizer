import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dsd-navbar',
  templateUrl: './dsd-navbar.component.html',
  styleUrls: ['./dsd-navbar.component.scss']
})
export class DsdNavbarComponent {
  
  constructor(private router: Router) {};
  
  isRouteActive(element: string) {
    return this.router.url.split('/').pop()?.match(element);
  }

}
