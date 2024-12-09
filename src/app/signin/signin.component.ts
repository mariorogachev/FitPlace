import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  template: `
    <button (click)="handleAuthAction()">
      {{ buttonLabel }}
    </button>
  `
})
export class SigninComponent implements OnInit {
  buttonLabel: string = 'Login';

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      this.buttonLabel = isAuthenticated ? 'Logout' : 'Login';
    });
  }

  handleAuthAction(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.auth.logout({ openUrl: false }).subscribe(() => {
          window.location.href = window.location.origin;  // Redirect manually
        });
      } else {
        this.auth.loginWithRedirect();
      }
    });
  }
}




