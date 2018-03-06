import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import User = firebase.User;

@Injectable()
export class AuthService {

  constructor(private router: Router) { }

  private user: User;
  private token: string;

  signUp(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(data => {
        firebase.auth().currentUser.getToken()
          .then(token => {
            this.token = token;
          })
        this.user = data;
        this.router.navigate(['/recipes']);
      });
  }

  logout() {
    firebase.auth().signOut().then(data => {
      this.user = null;
      this.token = null;
      this.router.navigate(['/signin']);
    });
  }

  isLoggedIn() {
    return this.user != null;
  }

  getToken() {
    this.user.getToken().then(token => this.token = token);
    return this.token;
  }
}
