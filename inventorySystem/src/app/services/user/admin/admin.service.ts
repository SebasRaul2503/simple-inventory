import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:3000/admin';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  //get all users
  getAllUsers(): Observable<any>{
    const token = this.cookieService.get('invToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.baseUrl}/getAllUsers`, { headers });
  }

}
