import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { authInterceptorFn } from './shared/interceptors/auth.interceptor';
import { errorInterceptorFn } from './shared/interceptors/error.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { materialProviders } from './shared/material.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withInterceptors([authInterceptorFn, errorInterceptorFn])
    ),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withFetch()),
    materialProviders
  ]
};
