import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';



const appRoutes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'dashboard',
    canActivate: [AuthGuardGuard],
    component: DashboardComponent 
  },
  { 
    path: 'profile', 
    canActivate: [AuthGuardGuard],
    component: ProfileComponent 
  },
  { 
    path: 'register', 
    component: RegisterComponent  
  },
  {
    path: 'reset-password', 
    canActivate: [AuthGuardGuard],
    component: ResetPasswordComponent
  },
  { 
    path: 'forgot-password', 
    component: ForgotPasswordComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}