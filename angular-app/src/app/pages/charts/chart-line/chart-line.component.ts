import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChartsService } from 'src/app/services/charts.service';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrl: './chart-line.component.scss'
})
export class ChartLineComponent implements OnInit{

  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Balance';
  timeline: boolean = true;

  lineChartData: any[];

  constructor(private chartsService: ChartsService,
    private authService: AuthService){ }

  ngOnInit(): void {
    this.chartsService.getLineBalance(this.authService.getSession())
    .subscribe({
      next: (chartData) =>{
        this.lineChartData = chartData;
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }

  search(){
    var dateStartElement = <HTMLInputElement> document.getElementById('dateStart');
    var dateStart = new Date(dateStartElement.value);

    var dateEndElement = <HTMLInputElement> document.getElementById('dateEnd');
    var dateEnd = new Date(dateEndElement.value);

    this.chartsService.getLineBalanceByDate(dateStart, dateEnd, this.authService.getSession())
    .subscribe({
      next: (chartData) =>{
        this.lineChartData = chartData;
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }
}
