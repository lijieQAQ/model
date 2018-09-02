import { Component } from '@angular/core';

/**
 * Generated class for the MySelectComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-select',
  templateUrl: 'my-select.html'
})
export class MySelectComponent {

  text: string;

  constructor() {
    console.log('Hello MySelectComponent Component');
    this.text = 'Hello World';
  }

}
