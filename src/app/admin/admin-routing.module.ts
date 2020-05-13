import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ForgetPassswordComponent } from './forget-passsword/forget-passsword.component';
import { UsercontactedComponent } from './usercontacted/usercontacted.component';


const routes: Routes = [
  {path:'admindashboard',component:AdmindashboardComponent},
  {path:'forget-password',component:ForgetPassswordComponent},
  {path:'usercontacted',component:UsercontactedComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
