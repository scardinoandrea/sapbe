import { SharedService } from './../../../services/shared.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../../../models/user.model';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user = this.userService.getCurrentUser();
  currentUser: any;
  currentUserName: any = 'Usuario';

  constructor(public userService: UserService,
    public authService: AuthService,
    private router: Router, 
    private db: AngularFireDatabase) { 
      this.currentUser = this.authService.userKey;
      /* this.db.database.ref().child('/users/'+this.currentUser).once('value').then(function(snapshot) {
        var username = (snapshot.val().username) || 'Anonymous';
        return username 
      }); */
      this.currentUserName=this.getUser();
      console.log(this.currentUserName)  
      //console.log(username)  
    }

    ngOnInit(): void {
      console.log(this.currentUser);
    }

    getUser(): Promise<any>{
      return this.db.database.ref().child('/users/'+this.currentUser).once('value').then(function(snapshot) {
        var username = (snapshot.val().username) || 'Anonymous';
        console.log(username);
        return username 
      });
    }

    logout(){
      this.authService.doLogout()
      .then((res) => {
        this.router.navigate(['/login']);
      }, (error) => {
        console.log("Logout error", error);
      });
    }

}
