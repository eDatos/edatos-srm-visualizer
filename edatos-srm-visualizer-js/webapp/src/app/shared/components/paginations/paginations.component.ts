import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-paginations',
    templateUrl: './paginations.component.html',
    styleUrls: ['./paginations.component.scss']
})
export class PaginationsComponent implements OnInit, OnChanges {

    @Input() currentPage: number = 0;
    @Input() totalItems: number = 0;
    @Input() pageSize: number = 0;
    @Output() changePage: EventEmitter<number> = new EventEmitter<number>();

    pages: number[] = [];

    get totalPages(): number {
        return Math.ceil(this.totalItems / this.pageSize);
    }

    ngOnInit(): void {
        this.calculateNumberPages();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['totalItems'] || changes['pageSize'] || changes['currentPage']) {
            this.calculateNumberPages();
        }
    }

    onPreviusPage() {
        if (this.currentPage > 0) {
            this.onChangePage(this.currentPage - 1);
        }
    }

    onNextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.onChangePage(this.currentPage + 1);
        }
    }

    onChangePage(newCurrentPage: number): void {
        this.currentPage = newCurrentPage;
        this.changePage.emit(this.currentPage);
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