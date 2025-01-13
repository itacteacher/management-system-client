import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loaderInterceptor, authInterceptor, errorHandlerInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
  ],
};
