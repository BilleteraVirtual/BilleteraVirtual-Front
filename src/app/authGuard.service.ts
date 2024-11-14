import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';



export const AuthGuard: CanActivateFn = async (route, state) => {
    const router = inject(Router);
    const service = inject(AuthService);
    if (await service.loggedIn()) {
        return true;
    }

    router.navigate(['/login']);
    return false
}