import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment'
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {
    postResponse: any;
    access_token: string;
    // public token: string;
   
    constructor(private http: Http,
                private router: Router) {
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    this.access_token = currentUser && currentUser.access_token;
                }

    private headers: Headers; 

    registerUser(userDetails: any) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        return this.http.post((environment.apiBaseUrl+'api/guest/v1/user/signUp'), userDetails, {
            headers: this.headers
        }).map(
            (res: Response) => res.json()
        );
    }

    loginUser(userLoginDetails: any) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        return this.http.post((environment.apiBaseUrl+'api/login'), userLoginDetails, {
            headers: this.headers
        })
        .map(
            (res: Response) => res.json()
        ).do(
            res => {
                if(res.access_token) {
                    localStorage.setItem('access_token', res.access_token);
                }    
            }
        );
    }

    isAuthenticated() {
        let access_token = this.getToken();
        if(access_token !== null) {
            return true;
        }
        else {
            return false;
        }
    }

    logoutUser(){
        this.headers = new Headers();
        let access_token = this.getToken();
        this.headers.append('Authorization', 'Bearer '+ access_token);
        localStorage.clear();
        console.log('access_token removed');
        return this.http.post((environment.apiBaseUrl+'api/logout'), {
            headers: this.headers
        }).map(
            (res: Response) => {
                (res: Response) => res.json()
        }); 
    }

    forgetPasswordUser(userForgotPassDetails: any) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        return this.http.post((environment.apiBaseUrl+'api/guest/v1/user/forgotPassword'), userForgotPassDetails, {
            headers: this.headers
        }).map(
            (res: Response) => res.json()
        );
    }

    getToken(){
        return localStorage.getItem('access_token');
    }

    resetPasswordUser(userResetPassDetails: any){

        this.headers = new Headers();
        let access_token = this.getToken();
        console.log(access_token);
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Bearer ' + access_token);
       
        return this.http.post((environment.apiBaseUrl+'api/v1/user/resetPassword'), userResetPassDetails, {
            headers: this.headers
        }).map(
            (res: Response) => res.json()
        );
    }

    changePasswordUser(userChangePasswordDetails: any){
        this.headers = new Headers;
        let access_token = this.getToken();
        console.log(userChangePasswordDetails);
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Bearer ' + access_token);
        return this.http.post((environment.apiBaseUrl+'api/v1/user/changePassword'), userChangePasswordDetails, {
            headers: this.headers
        }).map(
            (res: Response) => res.json()
        );
    }

}