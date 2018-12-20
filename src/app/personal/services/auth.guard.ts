import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
  } from "@angular/router";
  import { Injectable } from "@angular/core";
  import { Observable } from "rxjs";  
  import { Authservice } from './auth.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private authService: Authservice, private router: Router) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
      const isAuth = this.authService.getIsAuth();
      if (!isAuth) {
        this.router.navigate(['/404']);
      }
      return isAuth;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const isAuth = this.authService.getIsAuth();
      if (!isAuth) {
        this.router.navigate(['/404']);
      }
      return isAuth;
    }
  }
  