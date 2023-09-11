import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ErrorService {
    private errorStatusSubject = new BehaviorSubject<number | null>(null);

    constructor() {}

    setErrorStatus(status: number | null) {
        this.errorStatusSubject.next(status);
    }

    getErrorStatus(): Observable<number | null> {
        return this.errorStatusSubject.asObservable();
    }
}
