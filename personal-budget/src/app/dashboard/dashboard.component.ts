import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'pb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userBudget: any = [];
  color: any = [];
  randomColor = Math.floor(Math.random() * 16777215).toString(16);
  public dataSource: any =  {
    datasets: [
      {
        data: [],
        backgroundColor: this.color,
        borderColor: 'black',
        fill: false
      }
    ],
    labels: []
  };

  constructor(private http: HttpClient, public data1: DataService) {}

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  getbudget() {
    // tslint:disable-next-line: prefer-const
    this.data1.get_budgetById()
      .subscribe(
        (response: any) => {
          // console.log(this.dataSource);
          this.userBudget = response;
          for (let i = 0; i < response.length; i++) {
            this.dataSource.datasets[0].data[i] = response[i].budget;
            this.dataSource.labels[i] = response[i].title;
            this.color[i] = this.getRandomColor();

          }
          this.createChart();
          this.createBar();
          this.createLine();
          this.createdoughnut();
        },
        error => {
          console.log(error);
        });
  }
  // tslint:disable-next-line: typedef
  getRandomColor() {
    // tslint:disable-next-line: prefer-const
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }



  // tslint:disable-next-line: typedef
  createChart() {
    // const ctx = document.getElementById('myChart').getContext('2d');
    // tslint:disable-next-line: prefer-const
    let ctx: any = document.getElementById('pieChart');
    // tslint:disable-next-line: prefer-const
    let myPieChart = new Chart(ctx, {
        type: 'pie',
        data : this.dataSource
    });
  }

  // tslint:disable-next-line: typedef
  createBar(){
    // tslint:disable-next-line: prefer-const
    let ctx: any = document.getElementById('barChart');
    // tslint:disable-next-line: prefer-const
    let barChart = new Chart(ctx, {
        type: 'bar',
        data : this.dataSource
    });
}

// tslint:disable-next-line: typedef
createLine(){
  // tslint:disable-next-line: prefer-const
  let ctx: any = document.getElementById('lineChart');
  // tslint:disable-next-line: prefer-const
  let lineChart = new Chart(ctx, {
      type: 'line',
      data : this.dataSource
  });
}

// tslint:disable-next-line: typedef
createdoughnut() {
  // const ctx = document.getElementById('myChart').getContext('2d');
  // tslint:disable-next-line: prefer-const
  let ctx: any = document.getElementById('doughnutChart');
  // tslint:disable-next-line: prefer-const
  let doughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data : this.dataSource
  });
}

}
