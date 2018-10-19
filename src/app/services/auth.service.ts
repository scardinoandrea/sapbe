import { SharedService } from './shared.service';
import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<firebase.User | null>;
  currentUser = new EventEmitter();
  userKey: any;

  constructor(public afAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase,  private sharedService: SharedService) {
    this.afAuth.auth.onAuthStateChanged(
      (auth) => {
        if (auth != null) {
          //this.user = this.af.database.object('users/' + auth.uid);
          this.userKey = auth.uid;
        }
      });
    this.user = this.afAuth.authState
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then((user) => {
        //resolve(res);
        this.db.database.ref().child('users/'+user.user.uid).set({
          username: value.username,
          email: value.email,
        });
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut()
        resolve();
        this.router.navigate(['/login']);
      }
      else{
        reject();
      }
    });
  }
}
