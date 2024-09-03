import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private router:Router,
    private userService: UserService,
    private cookieService: CookieService
    ) {
    this.loginForm = new FormGroup({
      USERNAME: new FormControl(),
      USERPASSWORD: new FormControl()
    })
  }

  login(){
    const credentials = this.loginForm.value;
    this.userService.loginUser(credentials).subscribe(
      response => {
        this.cookieService.set('invToken', response.token);
        this.router.navigate(['dashboard']); // on response, goes to dashboard page
      },
      error =>{
        console.error("Error: ", error);
      }
    )
  }
}
