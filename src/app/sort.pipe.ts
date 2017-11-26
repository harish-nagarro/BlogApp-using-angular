import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array< object>): Array< object>  {
    value.sort((a: object, b: object) => {
      console.log( a['likes']);
      console.log(b['likes']);
      if (a['likes'] > b['likes'] ) {
        return -1;
      }else if ( a['likes'] < b['likes'] ) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log(value);
    return value;
  }

}
