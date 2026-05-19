import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-filter-dropdown',
    templateUrl: './filter-dropdown.component.html',
    host: { class: 'filter-dropdown col' }
})
export class FilterDropdownComponent {
    @Input() showAllVersions = false;
    @Input() showRecommendedCodelists: boolean | null = null;
    @Output() versionChange = new EventEmitter<{ checked: boolean }>();
    @Output() recommendedChange = new EventEmitter<{ checked: boolean }>();
}
