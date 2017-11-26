import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: any, category: any): any {
    return value.filter( value => value.category.toLowerCase() === category);
  }

}
