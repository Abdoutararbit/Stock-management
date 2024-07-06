import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Import the standalone component
import { DashbordComponent } from './dashbord/dashbord.component'; // Import other components as needed

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login
  { path: 'login', component: LoginComponent }, // Login route
  { path: 'dashbord', component: DashbordComponent } // Other routes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LoginComponent, // Import the standalone component here
    DashbordComponent // Import other standalone components here
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
