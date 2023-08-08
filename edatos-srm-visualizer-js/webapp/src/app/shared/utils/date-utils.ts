import { DatePipe } from '@angular/common';

export class DateUtils {
    static formatSimpleDate(dateStr: string): string {
        const dateObj = new Date(dateStr);
        const datePipe = new DatePipe('en-US'); // You can change 'en-US' to your desired locale but with 'es' or 'es-ES' does not work

        return <string>datePipe.transform(dateObj, 'dd/MM/yyyy HH:mm');
    }
}
