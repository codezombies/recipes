import {Component, OnInit} from '@angular/core';
import { environment } from '../environments/environment';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  page = 'recipes'

  onSelectPage(page: string) {
    this.page = page;
  }

  ngOnInit() {
    firebase.initializeApp(environment.firebaseOptions);
  }
}
