import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(private authService: AuthService,
              private router: Router,
              private alertService: AlertService) {}

  data: Object = {};
  loading = false;

  @ViewChild('myRegisterForm') registerForm: NgForm;

  ngOnInit() {

  }
  onRegister() {
    var userDetails = {
    'address' : this.registerForm.value.address,
    'firstName' : this.registerForm.value.fname,
    'lastName' : this.registerForm.value.lname,
    'email' : this.registerForm.value.email,
    'userName' : this.registerForm.value.username,
    'mobileNumber' : this.registerForm.value.mobilenumber,
    "role": ["2"]
    }
    this.authService.registerUser(userDetails).subscribe(
      data => {
          this.data = data;
          //let message = data.message;
          // let status = data.status;
          // if(status === true){
          //   console.log('Register Successful!');
          // }else {
          //   console.log('User is already registered');
          // }
          this.alertService.success(data.message, true);
          this.router.navigate(['/']);
          
      }, 
      error => {
        this.alertService.error(error);
        this.loading = false;
          //console.log(error);
      });
    this.registerForm.reset();
  }

}
