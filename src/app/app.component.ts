import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  page = 'recipes'

  onSelectPage(page: string) {
    this.page = page;
  }
}
