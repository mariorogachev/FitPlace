import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({ selector: 'app-auth-button', standalone: true, imports: [CommonModule], template: ` <button (click)="toggleAuth()"> {{ (isLoggedIn$ | async) ? 'Log Out' : 'Log In' }} </button> ` })
export class SigninComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;

  constructor(private auth: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.isAuthenticated$();
    this.isLoggedIn$.subscribe(isLoggedIn => {
      console.log(`User is ${isLoggedIn ? 'logged in' : 'logged out'}`);
      this.cdr.detectChanges(); // Ensure change detection is triggered
    });
  }

  toggleAuth(): void {
    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.auth.logout();
        console.log('User logged out');
        window.location.href = window.location.origin; // Redirect manually
        this.cdr.detectChanges(); // Ensure change detection is triggered
      } else {
        this.auth.login().subscribe(() => {
          console.log('User logged in');
          this.cdr.detectChanges(); // Ensure change detection is triggered
        });
      }
    });
  }
}














