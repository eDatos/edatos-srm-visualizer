import { ComplementosService } from '../../../core/services/html/complementos.service';
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  public navbar: string = '';

  constructor (private complementosService: ComplementosService, private elementRef: ElementRef,)  {
    
  }
  ngOnInit(): void {
    this.complementosService.getHeader().subscribe(html => {
      this.navbar = html.toString();
      setTimeout(() => {
        reinsertScripts(this.elementRef);
    });
    
  });
  }

}

export function reinsertScripts(el: ElementRef) {
  const scriptList = el.nativeElement.getElementsByTagName('script');
  for (const script of scriptList) {
      const scriptCopy = document.createElement('script');
      if (script.innerHTML) {
          scriptCopy.innerHTML = script.innerHTML;
      } else if (script.src) {
          scriptCopy.src = script.src;
      }
      scriptCopy.async = false;
      script.parentNode.replaceChild(scriptCopy, script);
  }
}



