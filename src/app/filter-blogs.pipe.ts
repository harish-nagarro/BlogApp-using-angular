import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBlogs'
})
export class FilterBlogsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    return value.filter( value => value.author === args );
  }

}
