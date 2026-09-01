import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Apiservice } from '@/service/apiservice/apiservice';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { map, catchError, of } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
    const router = inject(Router);
    const apiService = inject(Apiservice);

    return apiService.fetchUserProfile('').pipe(
        map((val) => {
            const details = val?.data;

            // Admin only
            if (details?.userGroupId === UserGroups.ADMIN && details?.userGroupName === 'Admin') {
                return true;
            }

            // Non-admin user
            return router.createUrlTree(['/home/manpower-request']);
        }),

        catchError(() => {
            return of(router.createUrlTree(['/']));
        })
    );
};
