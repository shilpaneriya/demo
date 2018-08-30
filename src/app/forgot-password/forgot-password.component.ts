import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  error: Object = {};
  loading = false;

  constructor(private authService: AuthService,
    private router: Router,
    private alertService: AlertService) {}

  @ViewChild('myRecoverForm') recoverForm: NgForm;

  onForgotPassword(){
    var userForgotPassDetails = {
      'email' : this.recoverForm.value.email
    }
    this.authService.forgetPasswordUser(userForgotPassDetails).subscribe(
      data => {
        this.alertService.success(data.message, true);
        
      },error => {
          this.error = error;
          if ((error.status === false)){
            this.alertService.error(error.message, false);
            this.loading = false;
          }
      });
      this.recoverForm.reset();
  }

}
