import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArrayObjects'
})
export class FilterArrayObjectsPipe implements PipeTransform {

  transform(array: any[], property: string, search: string) {

    if (!array) { return []; }

    if (!search || typeof search != 'string') { return array; }
    
    search = search.toLowerCase();

    return array.filter(item => {

      if (item && item[property]) {

        return item[property].toLowerCase().includes(search);
      }
      return false;
    });

   }

}
