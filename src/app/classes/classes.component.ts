import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SigninComponent } from '../signin/signin.component';
@Component({
  selector: 'app-classes',
  imports: [RouterModule,SigninComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent {

}
