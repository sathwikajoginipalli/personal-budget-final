import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  headers: HttpHeaders;
  jsonToken: string;
  constructor(private http: HttpClient) {
    // this.jsonToken = localStorage.getItem('token');
  }

  dataObservable: Observable<any> | undefined;

  public user = 'http://157.245.118.137:3000/user';
  // tslint:disable-next-line: variable-name
  public user_add = 'http://157.245.118.137:3000/user/add';
  // tslint:disable-next-line: variable-name
  public budget_add = 'http://157.245.118.137:3000/budget/add';
  // tslint:disable-next-line: variable-name
  public expense_add = 'http://157.245.118.137:3000/expense/add';
  public budget = 'http://157.245.118.137:3000/budget/byId';
  public expense = 'http://157.245.118.137:3000/expense/byId';
  public login = 'http://157.245.118.137:3000/userLogin';
  public signup = 'http://157.245.118.137:3000/userSignup';
  public newToken = 'http://157.245.118.137:3000/generateToken';


  User(): Observable<any> {
    if (this.dataObservable) {
      return this.dataObservable;
    } else {
      this.dataObservable = this.http.get(this.user).pipe(shareReplay());
      return this.dataObservable;
    }
  }
  // tslint:disable-next-line: typedef
  get_budgetById() {
    const headers = new HttpHeaders({
      token : this.jsonToken
    });
    // console.log(typeof this.http.get(this.budget + '/' + id))
    return this.http.get(this.budget,{headers : headers});
  }

  // tslint:disable-next-line: typedef
  get_expenseById() {
    const headers = new HttpHeaders({
      token : this.jsonToken
    });
    return this.http.get(this.expense,{headers : headers});
  }
  Budget(): Observable<any> {
    if (this.dataObservable) {
      return this.dataObservable;
    } else {
      this.dataObservable = this.http.get(this.budget).pipe(shareReplay());
      return this.dataObservable;
    }
  }
  Expense(): Observable<any> {
    if (this.dataObservable) {
      return this.dataObservable;
    } else {
      this.dataObservable = this.http.get(this.expense).pipe(shareReplay());
      return this.dataObservable;
    }
  }
  // tslint:disable-next-line: typedef
  // create_user(data: any) {
  //   return this.http.post(this.user_add, data);
  // }
  // tslint:disable-next-line: typedef
  create_user(data: any) {
    return this.http.post(this.signup, data);
  }
  // tslint:disable-next-line: typedef
  create_budget(data: any) {
    // console.log(this.jsonToken);
    const headers = new HttpHeaders({
      token : this.jsonToken
    });
    return this.http.post(this.budget_add, data,{headers : headers});
  }
  // tslint:disable-next-line: typedef
  create_expense(data: any) {
    const headers = new HttpHeaders({
      token : this.jsonToken
    });
    return this.http.post(this.expense_add, data,{headers : headers});
  }
  // tslint:disable-next-line: typedef
  loginUser(data: any) {
    return this.http.post(this.login, data);
  }

  // tslint:disable-next-line: typedef
  generateToken(data: any) {
    return this.http.post(this.newToken, data);
  }
}
