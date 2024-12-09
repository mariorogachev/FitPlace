import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SigninComponent } from '../signin/signin.component';
@Component({
  selector: 'app-schedule',
  imports: [RouterModule,SigninComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {

}
