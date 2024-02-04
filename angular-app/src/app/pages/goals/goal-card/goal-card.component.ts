import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Goal } from 'src/app/models/goal.model';
import { AuthService } from 'src/app/services/auth.service';
import { GoalsService } from 'src/app/services/goals.service';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss']
})
export class GoalCardComponent implements OnInit{

  @Input('goalId') goalId: string;
  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  goal: Goal = new Goal();
  percent: number = 0;

  constructor(private goalsService: GoalsService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.goalsService.getGoal(this.goalId)
    .subscribe({
      next: (goal) =>{
        this.goal = goal;
      },
      error: (response)=>{
        console.log(response);
      }
    });

    this.goalsService.getPercent(this.goalId, this.authService.getSession())
    .subscribe({
      next: (percent) =>{
        this.percent = percent;
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }

  delete(){
    this.deleteEvent.emit();
  }
}
