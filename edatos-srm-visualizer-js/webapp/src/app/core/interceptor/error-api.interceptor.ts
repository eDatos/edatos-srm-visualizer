import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ErrorService } from '../services/error/error.service';

@Injectable({
    providedIn: 'root',
})
export class ErrorApiInterceptor implements HttpInterceptor {
    constructor(private errorService: ErrorService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(req)
            .pipe(
                catchError((error) => {
                    if (error instanceof HttpErrorResponse) {
                        console.error('HTTP Error:', error.status, error.statusText);
                        this.errorService.setErrorStatus(error.status);
                    }
                    else {
                        console.error('Non-HTTP Error:', error);
                    }
                    return throwError(error);
                }));
    }
}
