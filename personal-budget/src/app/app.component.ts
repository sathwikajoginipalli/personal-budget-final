import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import {ChangeDetectorRef} from '@angular/core';


@Component({
  selector: 'pb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  int: NodeJS.Timeout;
  token: any;
  runTimer: boolean;
  secondsCount: string;
  logOut: NodeJS.Timeout;
  tokenRefresh: NodeJS.Timeout;
  constructor(
    private router: Router,
    public data1: DataService,
    public ref: ChangeDetectorRef
  ) {
  }
  title = 'personal-budget';

  // tslint:disable-next-line: typedef
  callPopup(){
        // after login only popup should come
      this.int =  setInterval(() => {
          this.tokenPopup();
          this.runTimer = true;
          }, 40000);
      this.logOut =   setInterval(() => {
            this.logout();
          }, 60000);
      this.ref.detectChanges();
  }

  // tslint:disable-next-line: typedef
  clearInterval(){
    clearInterval( this.int );
    clearInterval( this.logOut );
  }

  // tslint:disable-next-line: typedef
  logout(){
    document.getElementById('closeModal')?.click();
    this.router.navigate(['/login']);
    clearInterval( this.logOut );
    clearInterval( this.int );
    clearInterval( this.tokenRefresh );
  }

  // tslint:disable-next-line: typedef
  tokenPopup() {
    document.getElementById('modalPop')?.click();
  }

  // tslint:disable-next-line: typedef
  refreshToken(){
    this.token = this.data1.jsonToken;
    clearInterval( this.logOut );
    clearInterval( this.tokenRefresh );
    // tslint:disable-next-line: prefer-const
    let tokenObject = {
      token: this.token
    };
    this.tokenRefresh =  setInterval(() => {
      this.logout();
    }, 60000);
    this.data1.generateToken(tokenObject)
  .subscribe(
    (response: any) => {
      console.log(response);
      this.data1.jsonToken = response.token;
    },
    error => {
      console.log(error);
    });
  }

}
