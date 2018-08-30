import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth/auth.service';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ModalModule, AlertModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent,
    AlertComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    UpdateProfileComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    AlertModule.forRoot(), 
    ModalModule.forRoot()
  ],
  providers: [AuthGuardGuard, AuthService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
