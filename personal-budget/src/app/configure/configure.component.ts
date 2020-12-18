import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'pb-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {

  providerDetailsForm: FormGroup;
  token: string | null;
  // tslint:disable-next-line: ban-types
  userBudget:any = Object;

  constructor(private http: HttpClient, public data1: DataService, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.configureProviderForm();
  }

  // tslint:disable-next-line: typedef
  savebudget() {
    const providerRequestObject = {
      // _id: this.providerDetailsForm.value._id,
      // userId: this.providerDetailsForm.value.userId,
      title: this.providerDetailsForm.value.title,
      budget: this.providerDetailsForm.value.budget
    };
    console.log(providerRequestObject);
    this.data1.create_budget(providerRequestObject)
      .subscribe(
        response => {
          console.log('inserted budget');
          this.getbudget();
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
  configureProviderForm() {
    this.providerDetailsForm = this.formBuilder.group({
      // _id: [''],
      // userId: [''],
      title: [''],
      budget: ['']
    });
  }

}
