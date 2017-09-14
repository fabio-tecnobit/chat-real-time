import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CapitalizePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, onlyFist:boolean) {
    let words: string[];
    words = value.split(' ');
    let output:string='';
    if (onlyFist){
      return value.charAt(0).toUpperCase() + value.substr(1)
    }
    words.forEach((value: string, index:number, words:string[]) => {
      output +=value.charAt(0).toUpperCase() + value.substr(1) + ' ';
    });
    return output;
  }
}
