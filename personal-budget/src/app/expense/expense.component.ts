import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'pb-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  providerDetailsForm: FormGroup;
  token: string | null;
  userBudget: any;
  userExpense: any;

  constructor(private http: HttpClient, public data1: DataService, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.configureProviderForm();
  }

  // tslint:disable-next-line: typedef
  saveexpense() {
    const providerRequestObject = {
      // _id: this.providerDetailsForm.value._id,
      // userId: this.providerDetailsForm.value.userId,
      title: this.providerDetailsForm.value.title,
      expense: this.providerDetailsForm.value.expense
    };
    console.log(providerRequestObject);
    this.data1.create_expense(providerRequestObject)
      .subscribe(
        (response: any) => {
          console.log('inserted expense');
          this.getexpense();
          this.providerDetailsForm.reset();
        },
        error => {
          console.log(error);
        });
  }

  // tslint:disable-next-line: typedef
  getbudget() {
    // tslint:disable-next-line: prefer-const
    this.data1.get_budgetById()
      .subscribe(
        response => {
          console.log(response);
          this.userBudget = response;
        },
        error => {
          console.log(error);
        });
  }

  // tslint:disable-next-line: typedef
  getexpense() {
    // tslint:disable-next-line: prefer-const
    this.data1.get_expenseById()
      .subscribe(
        response => {
          console.log(response);
          this.userExpense = response;
        },
        error => {
          console.log(error);
        });
  }

  // tslint:disable-next-line: typedef
  configureProviderForm() {
    this.providerDetailsForm = this.formBuilder.group({
      // _id: [''],
      // userId: [''],
      title: [''],
      expense: ['']
    });
  }



}
