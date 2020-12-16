import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    public data1: DataService,
    public formBuilder: FormBuilder,
    private router: Router,
    private app: AppComponent
  ) // public loginForm: FormGroup
  {}

  ngOnInit(): void {
    this.configureLoginForm();
    this.app.clearInterval();
    localStorage.removeItem('token');
  }

  loginUser(): void {
    const loginObject = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.data1.loginUser(loginObject).subscribe(
      (response: any) => {
        console.log('loginsuccess');
        this.router.navigate(['/dashhome']);
        localStorage.setItem('token', response.token);
        localStorage.setItem('emailId', loginObject.username);
        this.data1.jsonToken = response.token;
        // console.log(response.token);
        this.app.callPopup();
        this.loginForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  configureLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }
}
