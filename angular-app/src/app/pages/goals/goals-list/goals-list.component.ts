import { Component, OnInit } from '@angular/core';
import { GoalsService } from 'src/app/services/goals.service';
import { trigger, transition, style, animate, query, stagger} from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,

          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0
        }), 
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*'
        })),
        animate(200)
      ]),

      transition('* => void', [
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0
        })),
        animate('150ms ease-out', style({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0, 
          paddingLeft: 0,
          'margin-bottom': '0'
        }))
      ])
    ]), 

    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
})
export class GoalsListComponent implements OnInit{

  isLoading = true;
  goals: string[] = [];

  constructor(private goalsService: GoalsService,
              private authService: AuthService){ }

  ngOnInit(): void {
    this.getAllGoalsId()
  }

  getAllGoalsId(){
    this.goalsService.getAllGoalsId(this.authService.getSession())
    .subscribe({
      next: (goalsIds) =>{
        this.isLoading = false;
        this.goals = goalsIds;
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }

  deleteGoal(id: string){
    this.goalsService.deleteGoal(id)
    .subscribe({
      next: () =>{
        this.getAllGoalsId();
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }

  checkNoneSearch(textRequest: string){
    if(textRequest.trim() === ""){
      this.getAllGoalsId();
      return;
    }
  }

  searchTransactions(textRequest: string){
    this.isLoading = true;

    if(textRequest.trim() === ""){
      this.getAllGoalsId();
      return;
    }

    this.goalsService.getAllGoalsIdByText(textRequest.trim(),this.authService.getSession())
    .subscribe({
      next: (goalsIds) =>{
        this.isLoading = false;
        this.goals = goalsIds;
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }
}
