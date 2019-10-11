import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MonsterBox';
  
  value = '';

  update(value: string) { this.value = value; }

  clickedStart() {
    console.log()
  }

}