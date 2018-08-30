import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name = 'anony';

  constructor(private authService: AuthService,
              private router: Router) {

  }

 ngOnInit() {
   
 }

//  onLogout(){
//    this.authService.logoutUser();
//    this.router.navigate(['/']);
//  }

}
