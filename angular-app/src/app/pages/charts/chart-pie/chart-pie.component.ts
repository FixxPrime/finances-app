import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChartsService } from 'src/app/services/charts.service';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrl: './chart-pie.component.scss'
})
export class ChartPieComponent implements OnInit{

  gradient: boolean = true;
  showLegend: boolean = true;
  isDoughnut: boolean = false;
  showLabels: boolean = true;

  pieChartData: any[];
  savedType: string;

  constructor(private chartsService: ChartsService,
              private authService: AuthService,
              private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) =>{
        const type = params.get('type');

        if(type == "expense"){
          this.savedType = "expense";
          this.chartsService.getPieExpense(this.authService.getSession())
          .subscribe({
            next: (chartData) =>{
              this.pieChartData = chartData;
            },
            error: (response)=>{
              console.log(response);
            }
          });
        } else{
          this.savedType = "income";
          this.chartsService.getPieIncome(this.authService.getSession())
          .subscribe({
            next: (chartData) =>{
              this.pieChartData = chartData;
            },
            error: (response)=>{
              console.log(response);
            }
          });
        }
      }
    })
  }

  search(){
    var dateStartElement = <HTMLInputElement> document.getElementById('dateStart');
    var dateStart = new Date(dateStartElement.value);

    var dateEndElement = <HTMLInputElement> document.getElementById('dateEnd');
    var dateEnd = new Date(dateEndElement.value);

    if(this.savedType == "expense"){
      this.chartsService.getPieExpenseByDate(dateStart, dateEnd, this.authService.getSession())
      .subscribe({
        next: (chartData) =>{
          this.pieChartData = chartData;
        },
        error: (response)=>{
          console.log(response);
        }
      });
    } else{
      this.chartsService.getPieIncomeByDate(dateStart, dateEnd, this.authService.getSession())
      .subscribe({
        next: (chartData) =>{
          this.pieChartData = chartData;
        },
        error: (response)=>{
          console.log(response);
        }
      });
    }
  }
}
