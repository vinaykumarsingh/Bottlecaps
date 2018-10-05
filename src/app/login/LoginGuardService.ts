import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class LoginGuardService implements CanActivate {

  constructor( private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('EmailId')==null) {
      return true;
    } else {
      this.router.navigate(['/'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}