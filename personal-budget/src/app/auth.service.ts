import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public data1: DataService) { }

  // isLoggedIn(): boolean {
  //   return false;
  // }
  // tslint:disable-next-line: typedef
  verifyToken(){
    return !!localStorage.getItem('token');
  }
}
