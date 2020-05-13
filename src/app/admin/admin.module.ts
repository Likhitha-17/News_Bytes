import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }   from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ForgetPassswordComponent } from './forget-passsword/forget-passsword.component';
import { UsercontactedComponent } from './usercontacted/usercontacted.component';


@NgModule({
  declarations: [AdmindashboardComponent, ForgetPassswordComponent, UsercontactedComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
