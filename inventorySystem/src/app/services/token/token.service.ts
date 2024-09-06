import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private cookieService: CookieService
  ) { }

  getToken(): string{
    return this.cookieService.get('invToken');
  }

  decodeToken(): any{
    try {
      const token = this.getToken();
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  isTokenExpired(): boolean {
    const decodedToken = this.decodeToken();
    if(!decodedToken) {
      return true;
    }

    const expirationDate = this.getTokenExpirationDate(decodedToken);
    if (expirationDate === undefined) {
      return true;
    }

    return expirationDate < new Date();
  }

  private getTokenExpirationDate(decodedToken: any): Date | undefined {
    if (!decodedToken.exp) {
      return undefined;
    }

    const date = new Date(0); 
    date.setUTCSeconds(decodedToken.exp);
    return date;
  }


  validateToken(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    if (this.isTokenExpired()) {
      return false; // verifies expiration time
    }

    return true;
  }

  validateTokenAsync(): Observable<boolean> {
    const token = this.getToken();
    try {
      const decodedToken = jwtDecode(token);
      const expirationDate = this.getTokenExpirationDate(decodedToken);
      if (!decodedToken.exp || (expirationDate && expirationDate < new Date())) {
        return of(false);
      }
      return of(true);
    } catch (error) {
      return of(false);
    }
  }

  getUserRole(): number {
    const decodedToken = this.decodeToken();
    var role = 0;
    if (decodedToken && decodedToken.roleName) {
      if (decodedToken.roleName == 'Admin'){
        role = 1;
      } else if (decodedToken.roleName == 'Manager') {
        role = 2;
      }else if (decodedToken.roleName == 'Staff') {
        role = 3;
      }
    }
    console.log(decodedToken.roleName);
    console.log(role);
    return role;
  }

}
