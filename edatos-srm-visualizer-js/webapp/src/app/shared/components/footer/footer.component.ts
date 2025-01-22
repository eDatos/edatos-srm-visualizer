import { Component, OnInit } from '@angular/core';
import { ComplementosService } from 'src/app/core/services/html/complementos.service';
import { appendContextualFragment } from "../../utils/html-utils";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public footer: string = '';

  constructor(private complementosService: ComplementosService) {}

  ngOnInit() {
    this.complementosService.getFooter().subscribe(data => {
      this.footer = data.toString();
      appendContextualFragment(this.footer, "footer");
    })
  }
}
