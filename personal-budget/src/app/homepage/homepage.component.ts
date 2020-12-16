import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {

  title = "homepage";

  constructor(private router: Router) {}

  ngOnInit(): void {}
  // tslint:disable-next-line: typedef
  navigateLogin() {
    this.router.navigate(['/login']);
  }
}
