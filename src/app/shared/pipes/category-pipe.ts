import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
  standalone: true
})
export class CategoryPipe implements PipeTransform {
  transform(category: string): string {
    const iconMap: { [key: string]: string } = {
      'front-end': 'code',
      'back-end': 'storage',
      'full-stack': 'dns',
      'mobile': 'devices',
      'design': 'palette',
      'devops': 'settings',
      'data-science': 'analytics',
      'default': 'category'
    };

    return iconMap[category.toLowerCase()] || iconMap['default'];
  }
}
