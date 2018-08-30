import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  newProfilePicture: string;
  filename: any;
  modalRef: BsModalRef;

  data: object = {};
  profile: any = {};
  profilePicture: string;
  placeholderBase64: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  file : any;
  
  private placeHolderSafe: SafeUrl;

  private base64textString:String="";

  constructor(private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private http: Http,
    private sanitizer: DomSanitizer,
    private modalService: BsModalService) {}

    public get placeholder() {
      return this.placeHolderSafe;
    }

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
        
        /* For Profile Picture Base64 Path */
        this.profilePicture = this.profile.profilePicture;
        this.placeholderBase64 = `data:image/jpeg;base64,${this.profilePicture}`; 
        this.placeHolderSafe = this.sanitizer.bypassSecurityTrustUrl(this.placeholderBase64);  
        
        /* For User Info */
        this.firstName = this.profile.firstName;
        let fname = this.firstName;
        this.lastName = this.profile.lastName;
        let lname = this.lastName;
        this.fullName = fname +" "+ lname ;
        //console.log("User Name : ",this.fullName);

        this.email = this.profile.email;
        let email = this.email;
        //console.log("Email : ", email);

      }, error => {
        console.log(error);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];
    if(files && file) {
      var reader = new FileReader();
      reader.onload =this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
      this.file = file;
      this.filename = this.file.name;
      console.log("fileName : ", this.filename);
      this.placeholderBase64 = `data:image/jpeg;base64,${this.profilePicture}`;
      let profilePicture = this.placeholderBase64;
      console.log("FileContents : ", profilePicture);
    }
  }

  handleReaderLoaded(readerEvt){
    var binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);
    this.profilePicture = btoa(binaryString);
  }

  onClick(fileName: string, newProfilePicture: string){
    var formData = {
      'fileName' : fileName,
      'fileContents' : newProfilePicture
    } 
    //console.log("Upload Button clicked!!!");
    this.headers = new Headers;
    let access_token = this.authService.getToken();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer '+access_token);
    this.http.post((environment.apiBaseUrl+'api/v1/user/updateProfilePicture'), formData, {
      headers: this.headers
    }).map(
      (res: Response) => res.json()
    ).subscribe(
    data => {
        this.data = data;
        this.placeholderBase64 = `data:image/jpeg;base64,${this.profilePicture}`;
        this.newProfilePicture = this.placeholderBase64;
        let profileImage = this.newProfilePicture;
        console.log("newFileContent : ", profileImage);
        this.alertService.success(data.message, true); 
        console.log("Message :" + data.message);       
    }, 
    error => {
      console.log(error);
      this.alertService.error(error);
      });
    }
}

