import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  loginUser(credentials: { USERNAME: string, USERPASSWORD: string }):Observable<any>{
    return this.http.post(`${this.baseUrl}/userLogin`, credentials);// not privileges needed
  }

}
