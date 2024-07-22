import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      // Check if any column contains the searchText
      return Object.keys(item).some((key) => {
        const columnValue = item[key];
        if (
          typeof columnValue === 'string' &&
          columnValue.toLowerCase().includes(searchText)
        ) {
          return true;
        }
        return false;
      });
    });
  }
}
