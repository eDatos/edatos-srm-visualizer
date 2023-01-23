import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agency'
})
export class AgencyPipe implements PipeTransform {

  transform(text: string, ...args: unknown[]): string {
    return  text.split('=')[1].split(':')[0];
    
  }

}
