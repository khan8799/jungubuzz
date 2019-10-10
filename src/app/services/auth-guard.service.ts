import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private route: Router
  ) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(map(user => {
      if (user)
        return true;

      this.route.navigate(['/login'], { queryParams: { returnUrl: state.url}});
      return false;
    }));
  }
}
