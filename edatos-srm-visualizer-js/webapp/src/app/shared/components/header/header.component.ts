import { ComplementosService } from 'src/app/core/services/html/complementos.service';
import { Component, OnInit } from '@angular/core';
import { appendContextualFragment } from 'src/app/shared/utils/html-utils';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private complementosService: ComplementosService) {
    }

    ngOnInit(): void {
        this.complementosService.getHeader().subscribe(html => {
            const headerHtml = html.toString();
            appendContextualFragment(headerHtml, "header");
        });
    }
}


