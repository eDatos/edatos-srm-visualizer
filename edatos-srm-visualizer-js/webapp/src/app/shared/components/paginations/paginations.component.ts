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

    get totalPages(): number {
        return Math.ceil(this.paginationSize / this.paginationLimit);
    }

    ngOnInit(): void {
        this.calculateNumberPages();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['paginationSize'] || changes['paginationLimit'] || changes['currentPage']) {
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
        const total = this.totalPages;
        const maxVisible = 5;
        let start = Math.max(0, this.currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(total, start + maxVisible);

        if (end - start < maxVisible) {
            start = Math.max(0, end - maxVisible);
        }

        this.pages = [];
        for (let i = start; i < end; i++) {
            this.pages.push(i);
        }
        return this.pages;
    }
}
