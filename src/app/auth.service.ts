import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth0: Auth0Service) {}

  login(): Observable<void> {
    return this.auth0.loginWithRedirect() as Observable<void>;
  }

  logout(): void {
    this.auth0.logout(); // We will handle the redirect manually after logout
  }

  isAuthenticated$(): Observable<boolean> {
    return this.auth0.isAuthenticated$;
  }
}

