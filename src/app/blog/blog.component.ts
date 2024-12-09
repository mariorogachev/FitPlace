import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SigninComponent } from '../signin/signin.component';
@Component({
  selector: 'app-blog',
  imports: [RouterModule,SigninComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

}
