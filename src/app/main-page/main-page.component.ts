import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterModule,SigninComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {}

