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
runTimer : boolean;
secondsCount : string;
  logOut: NodeJS.Timeout;
  tokenRefresh: NodeJS.Timeout;
  constructor(
    private router: Router,
    public data1: DataService,
    public ref : ChangeDetectorRef
  ) {
    this.token = localStorage.getItem('token');
  }
  title = 'personal-budget';

  callPopup(){
        //after login only popup should come
      this.int =  setInterval(() => {
          this.tokenPopup();
          this.runTimer = true;
          }, 40000);
      this.logOut =   setInterval(() => {
            this.logout();
          }, 60000);
      this.ref.detectChanges();
  }

  clearInterval(){
    clearInterval( this.int );
    clearInterval( this.logOut );
  }

  logout(){
    document.getElementById('closeModal')?.click();
    this.router.navigate(['/login']);
    clearInterval( this.logOut );
    clearInterval( this.int );
    clearInterval( this.tokenRefresh );
  }

  tokenPopup() {
    document.getElementById('modalPop')?.click();
  }

  refreshToken(){
    clearInterval( this.logOut );
    clearInterval( this.tokenRefresh );
    // tslint:disable-next-line: prefer-const
    let tokenObject = {
      token: this.token
    };
 this.tokenRefresh =  setInterval(() => {
      this.logout();
    }, 600000);
    this.data1.generateToken(tokenObject)
  .subscribe(
    (response: any) => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

}
