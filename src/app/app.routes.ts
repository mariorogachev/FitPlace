import { Routes } from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component'
import { BlogComponent } from './blog/blog.component';
import { ClassesComponent } from './classes/classes.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ContactComponent } from './contact/contact.component';
import { SigninComponent } from './signin/signin.component';

export const routes: Routes = [
  { path: 'home', component: MainPageComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'signin', component:SigninComponent  },
  { path: 'contact', component: ContactComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' } 
];


