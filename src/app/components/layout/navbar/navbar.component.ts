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
  currentUserName: any;

  constructor(public userService: UserService,
    public authService: AuthService,
    private router: Router, 
    private db: AngularFireDatabase) { 
      this.currentUser = this.authService.userKey;
      this.currentUserName = this.db.object(`/users/${this.currentUser}/username`);
      console.log(this.currentUserName)  
    }

    ngOnInit(): void {
      console.log(this.currentUser);
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
