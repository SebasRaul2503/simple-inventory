import { CanActivate} from '@angular/router';
import { CookieService } from "ngx-cookie-service";
import { Router } from '@angular/router';
import { Injectable, ɵsetUnknownElementStrictMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class routesGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(): boolean {
    const token = this.cookieService.get('invToken');
    if(token) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
