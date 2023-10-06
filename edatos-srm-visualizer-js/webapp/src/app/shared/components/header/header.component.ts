import { ComplementosService } from 'src/app/core/services/html/complementos.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { reinsertScripts } from 'src/app/shared/utils/html-utils';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public navbar: string = '';

    constructor(private complementosService: ComplementosService, private elementRef: ElementRef) {}

    ngOnInit(): void {
        this.complementosService.getHeader().subscribe(html => {
            this.navbar = html.toString();
            setTimeout(() => {
                reinsertScripts(this.elementRef);
            });

        });
    }

}


