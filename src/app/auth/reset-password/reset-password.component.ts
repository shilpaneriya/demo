import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent{

  error: Object = {};
  loading = false;

  constructor(private authService: AuthService,
    private router: Router,
    private alertService: AlertService) {}

  @ViewChild('myResetPasswordForm') resetForm: NgForm;

  onReset(){
    var userResetPassDetails = {
      'newPassword' : this.resetForm.value.password
    }
    this.authService.resetPasswordUser(userResetPassDetails).subscribe(
      data => {
        this.alertService.success(data.message, true);
      },error => {
          this.error = error;
          if ((error.status === false)){
            this.alertService.error(error.message, false);
            this.loading = false;
          }
      });
      this.resetForm.reset();
  }
}
