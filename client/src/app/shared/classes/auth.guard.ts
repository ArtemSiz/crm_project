import {
    ActivatedRouteSnapshot, CanActivate, CanActivateChild, NavigationExtras, Router,
    RouterStateSnapshot
} from "@angular/router";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.services";

// declare let accessDenied: any;
// declare let accessDenied: NavigationExtras;

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private auth: AuthService,
                private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        if (this.auth.isAuthenticated()) {
            return of(true)
        } else {
            let navigationExtras: NavigationExtras = {
                queryParams: {'accessDenied': true}
            };
            this.router.navigate(['/login'], navigationExtras);
            return of(false);
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.canActivate(route, state);
    }

}