import { Auth } from '@/service/auth/auth';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserGroups } from '@/models/usergroups/usergroups.enum';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    const userId = sessionStorage.getItem('userId');

    // User is not logged in
    if (!userId) {
        return router.createUrlTree(['/']);
    }

    // Dashboard is Admin only
    if (state.url === '/home/dashboard') {
        const userGroupId = Number(sessionStorage.getItem('userGroupId'));

        if (userGroupId !== UserGroups.ADMIN) {
            return router.createUrlTree(['/home/manpower-request']);
        }
    }

    // Other authenticated pages
    return true;
};
