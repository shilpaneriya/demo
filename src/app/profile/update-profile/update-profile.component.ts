import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../alert/alert.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment'
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  
  data: object = {};
  loading = false;
  profile: object = {};

  constructor(private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private http: Http) {}

    private headers: Headers;

  ngOnInit() {
    this.data = {
      profile: {
        firstName: '',
        lastName: '',
        mobileNumber: ''
      }
    }
    this.fetchUser();
  }

  fetchUser(){
        
    var userDetails = {};
    this.headers = new Headers;
    let access_token = this.authService.getToken();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer '+access_token);
    this.http.post((environment.apiBaseUrl+'api/v1/user/fetchUserProfile'), userDetails, {
        headers: this.headers
    }).map(
        (res: Response) => res.json()
    ).subscribe(
      data => {
        this.data = data;
        this.profile = data.profile;
      }, error => {
        console.log(error);
    });
  }

  onUpdateProfile(name: string, lastName: string, mobileNumber: number){
      var userUpdateData = {
        'firstName' :name,
        'lastName' : lastName,
        'mobileNumber': mobileNumber
      }      
      this.headers = new Headers();
      let access_token = this.authService.getToken();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Bearer ' + access_token);
      return this.http.post((environment.apiBaseUrl+'api/v1/user/updateUserProfile'), userUpdateData, {
          headers: this.headers
      }).map(
          (res: Response) => res.json()

      ).subscribe(
      data => {
          this.data = data;
          this.alertService.success(data.message, true); 
          console.log("Message :" + data.message);       
      }, 
      error => {
        console.log(error);
        this.alertService.error(error);
        this.loading = false;
      });
  }

}

