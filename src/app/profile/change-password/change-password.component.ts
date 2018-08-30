import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  @ViewChild('mychangePasswordForm') changePasswordForm: NgForm;

  error: Object = {};
  loading = false;

  constructor(private authService: AuthService,
    private router: Router,
    private alertService: AlertService) {}

    onChangePassword() {
      var userChangePasswordDetails = {
        'oldPassword' : this.changePasswordForm.value.oldPassword,
        'newPassword' : this.changePasswordForm.value.newPassword
      }
      this.authService.changePasswordUser(userChangePasswordDetails).subscribe(
        data => {
          this.alertService.success(data.message, true);
          console.log(data);
        },error => {
            this.error = error;
            if ((error.status === false)){
              this.alertService.error(error.message, false);
              this.loading = false;
            }
        });
        this.changePasswordForm.reset();
    }
  

}
