import { Routes } from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component'
import { BlogComponent } from './blog/blog.component';
import { ClassesComponent } from './classes/classes.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from '@auth0/auth0-angular';



export const routes: Routes = [
  { path: 'home', component: MainPageComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' } ,
];