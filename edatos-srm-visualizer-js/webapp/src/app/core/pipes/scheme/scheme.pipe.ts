import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scheme'
})
export class SchemePipe implements PipeTransform {

  transform(text: string): unknown {
    console.log(text)
    return text.split('=')[1].split(':')[1].split('(')[0]
  }

}
