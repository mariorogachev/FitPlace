import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AboutComponent } from './about/about.component';
// Import other components as needed

const routes: Routes = [
  { path: 'home', component: MainPageComponent },
  { path: 'about', component: AboutComponent },
  // Define other routes here
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Redirect default route to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Register the routes
  exports: [RouterModule]  // Export RouterModule so it can be used in other parts
})
export class AppRoutingModule { }
