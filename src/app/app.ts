import { Component } from '@angular/core';
import { ManifiestosTablaComponent } from './components/manifiestos-tabla/manifiestos-tabla';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ManifiestosTablaComponent],
  styles: [`:host { display: block; padding: 1.5rem; background: #f4f5f7; min-height: 100vh; }`],
  template: `<app-manifiestos-tabla />`
})
export class AppComponent {}