import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { authInterceptor } from '@/service/token/auth-interceptor';
import { authInitializer } from '@/initializers/auth.initializer';
import { Auth } from '@/service/auth/auth';
import { Loader } from '@/service/loader/loader';

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: authInitializer,
            deps: [Auth, Loader],
            multi: true
        },
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
        provideAnimationsAsync(),
        providePrimeNG({ ripple: true, theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } })
    ]
};
