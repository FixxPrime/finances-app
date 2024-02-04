import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  if(inject(AuthService).isAuthenticated()) return true;

  inject(Router).navigateByUrl('auth/login');
  return false;
};
