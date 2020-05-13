import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ReadnowComponent } from './readnow/readnow.component';
import { ArticlesComponent } from './readnow/articles/articles.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { FeedbackComponent } from './user/feedback/feedback.component';
import { ForgetPassswordComponent } from './admin/forget-passsword/forget-passsword.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'readnow',component:ReadnowComponent},
  {path:'user/contact',component:ContactComponent},
  {path:'readnow/articles',component:ArticlesComponent},
  {path:'login',component:LoginComponent},
  {path:'user/signup',component:SignupComponent},
  {path:'admindashboard',component:AdmindashboardComponent},
  {path:'feedback',component:FeedbackComponent},
  {path:'forget-password',component:ForgetPassswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
