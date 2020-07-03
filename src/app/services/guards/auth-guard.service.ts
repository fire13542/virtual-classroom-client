import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, stat: RouterStateSnapshot){
    return AuthService.isTeacher || AuthService.isStudent;
  }
}
