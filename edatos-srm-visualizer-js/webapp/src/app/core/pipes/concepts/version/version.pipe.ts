import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'version'
})
export class VersionPipe implements PipeTransform {

  private domain : string = 'https://estadisticas.arte-consultores.com/structural-resources/v1.0/codelists/'

  transform(text: string): string {
    let splitText  = text.split('=')[1].split(':')[1];
    if (splitText) {
      let version = splitText.slice(splitText.indexOf('(')+1, splitText.length-1);
    }
    return '';
  }

}
