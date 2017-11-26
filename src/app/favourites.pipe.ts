import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'favourites'
})
export class FavouritesPipe implements PipeTransform {

  transform(value: Array< object>, favourites: Array<string>): Array<object> {
    return value.filter( value => favourites.indexOf( ('' + value['id']) ) > -1);

  }

}
