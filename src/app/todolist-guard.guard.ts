import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import { currentUser } from './fake-user';

@Injectable({
  providedIn: 'root'
})

export class todolistGuard  {
  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | UrlTree{
    //retrive the rolesAllowrd date from route by using route.data
    const rolesAllowed = route.data['rolesAllowed'] as string [];
    const userRoles = currentUser.roles;
    const hasPermission = rolesAllowed.some(role => userRoles.includes(role));

    if (hasPermission) {
      return true; // allow access
    } else {
      // Redirect to a page that doesn't have access
      return this.router.parseUrl('/unauthorized');
    }
  }
}