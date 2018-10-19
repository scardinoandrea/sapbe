import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../../../services/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();


  constructor(public userService: UserService,
    public authService: AuthService,
    private router: Router,
    private location : Location,
    private fb: FormBuilder) { }

    ngOnInit(): void {
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
