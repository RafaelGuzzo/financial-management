import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { authInterceptorFn } from './shared/interceptors/auth.interceptor';
import { errorInterceptorFn } from './shared/interceptors/error.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { DropdownModule, SidebarModule, OffcanvasModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    provideHttpClient(withInterceptors([authInterceptorFn, errorInterceptorFn]), withFetch()),
    provideClientHydration(),
    provideAnimationsAsync(), // <-- substitui BrowserAnimationsModule + provideAnimations
    provideToastr(),
    provideCharts(withDefaultRegisterables()),
    importProvidersFrom(SidebarModule, DropdownModule, OffcanvasModule), // <-- importante
    IconSetService
  ]
};
