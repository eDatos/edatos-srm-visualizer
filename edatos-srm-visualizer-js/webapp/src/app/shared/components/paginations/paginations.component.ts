import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginations',
  templateUrl: './paginations.component.html',
  styleUrls: ['./paginations.component.scss']
})
export class PaginationsComponent implements OnInit {
  
  @Input() paginationSize: number = 0;
  @Input() paginationLimit: number = 0;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  currentPage: number = 0;
  pages: number[] = [];
  
  ngOnInit(): void {
    this.calculateNumberPages();
  }
  
  onPreviusPage() {
    if (this.currentPage > 0) {
      this.currentPage = this.currentPage -1;
      this.changePage.emit(this.currentPage);
    }
  }
  onNextPage() {
    if (this.currentPage < this.pages.length -1) {
      this.currentPage = this.currentPage  + 1;
      this.changePage.emit(this.currentPage);
    }
  }
  onChangePage(newCurrentPage: number): void {
    this.currentPage = newCurrentPage;
    this.changePage.emit(newCurrentPage);
  }

  calculateNumberPages(): number[] {
    if ((this.paginationSize > 0 && this.paginationLimit > 0) && (this.paginationSize > this.paginationLimit)) {
      this.pages = [...Array(Math.ceil(this.paginationSize / this.paginationLimit)).keys()];
    }

    return this.pages;
  }

}
