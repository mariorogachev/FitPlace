import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-vzkh7u53q7xwkj4i.us.auth0.com',
      clientId: 'IJ4YMqVtA7D5aacj3qmBDLktsn6Sk87e',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    importProvidersFrom(CommonModule, BrowserAnimationsModule,MatDialogModule)
  ],
};




