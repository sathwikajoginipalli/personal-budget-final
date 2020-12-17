import { Component, OnInit} from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  Router: any;

  constructor(
    public data1: DataService,
    public formBuilder: FormBuilder,
    private router: Router
    // public signupForm: FormGroup
  ) {
  }

  ngOnInit(): void {
    this.configureSignupForm();
  }

  saveUser(): void {
    const signupObject = {
      username: this.signupForm.value.username,
      password: this.signupForm.value.password,
    };
    this.data1.create_user(signupObject).subscribe(
      (response: any) => {
        if (response.message){
          console.log('exists');
        }
        console.log('inserted value');
        this.signupForm.reset();
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        // tslint:disable-next-line: triple-equals
        if (error.error.message == 'User exists'){
          alert('username already exists');
        }
      }
    );
  }

  configureSignupForm(): void {
    this.signupForm = this.formBuilder.group({
      _id : [''],
      username: [''],
      password: [''],
    });
  }
}
