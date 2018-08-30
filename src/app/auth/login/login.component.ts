import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  data: any = {};
  error: Object = {};
  loading = false;

  constructor(private authService: AuthService,
              private router: Router,
              private alertService: AlertService) {}

  @ViewChild('myLoginForm') loginForm: NgForm;
  
  onLogin() {
    var userLoginDetails = {
      'username' : this.loginForm.value.email,
      'password' : this.loginForm.value.password
    }
    this.authService.loginUser(userLoginDetails).subscribe(
    data => {
    this.data = data;
    let isPasswordSystemGenerated = data.currentUserDetails.isPasswordSystemGenerated; 
    let username = data.currentUserDetails.firstName;
    console.log(isPasswordSystemGenerated); 
      if(isPasswordSystemGenerated){
          this.router.navigate(['/reset-password']);
      } 
      else
      {
        this.router.navigate(['/dashboard']);
      }
    },error => {
      this.error = error;
      if ((error.status === 401 || error.status === 403)){
        this.alertService.error('Sorry, we were not able to find a user with that username and password.');
        this.loading = false;
      }
    });

    this.loginForm.reset();
  }

}
