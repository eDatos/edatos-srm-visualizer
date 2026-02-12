import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-paginations',
    templateUrl: './paginations.component.html',
    styleUrls: ['./paginations.component.scss']
})
export class PaginationsComponent implements OnChanges {

    @Input() currentPage: number = 0;
    @Input() paginationSize: number = 0;
    @Input() paginationLimit: number = 0;
    @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
    pages: number[] = [];

    ngOnInit(): void {
        this.calculateNumberPages();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['paginationSize'] || changes['paginationLimit']) {
            this.calculateNumberPages();
        }
    }

    onPreviusPage() {
        if (this.currentPage > 0) {
            this.currentPage = this.currentPage - 1;
            this.changePage.emit(this.currentPage);
        }
    }

    onNextPage() {
        if (this.currentPage < this.pages.length - 1) {
            this.currentPage = this.currentPage + 1;
            this.changePage.emit(this.currentPage);
        }
    }

    onChangePage(newCurrentPage: number): void {
        this.currentPage = newCurrentPage;
        this.changePage.emit(newCurrentPage);
    }

    calculateNumberPages(): number[] {
        if (this.paginationSize > 0 && this.paginationLimit > 0) {
            const count = Math.ceil(this.paginationSize / this.paginationLimit);
            this.pages = [...Array(count).keys()];
        } else {
            this.pages = [];
        }
        return this.pages;
    }
}
