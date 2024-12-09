import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';  // Import provideAuth0
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-vzkh7u53q7xwkj4i.us.auth0.com',  // Your Auth0 domain
      clientId: 'KokpYLAT9zo9zv1p4hec5yGr8c9kYN2o',  // Your Auth0 client ID
      authorizationParams: {
        redirect_uri: window.location.origin  // Redirect URL after authentication
      }
    }),
  ],
};


