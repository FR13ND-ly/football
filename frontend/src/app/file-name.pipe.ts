import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileName',
  standalone: true
})
export class FileNamePipe implements PipeTransform {

  transform(value: string): unknown {
     return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

}
