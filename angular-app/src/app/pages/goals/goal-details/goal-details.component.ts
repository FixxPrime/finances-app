import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from 'src/app/models/goal.model';
import { AuthService } from 'src/app/services/auth.service';
import { GoalsService } from 'src/app/services/goals.service';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.scss']
})
export class GoalDetailsComponent implements OnInit{

  typePage: boolean = false;
  goal: Goal = new Goal();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private goalsService: GoalsService,
              private authService: AuthService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) =>{
        const id = params.get('id');

        if(id){
          this.typePage = true;

          this.goalsService.getGoal(id)
          .subscribe({
            next: (goal) =>{
              this.goal = goal;
            },
            error: (response)=>{
              this.router.navigateByUrl('goals/list');
              console.log(response);
            }
          });
        }
      }
    })
  }

  onSubmit(form: NgForm){
    this.goal.userId = this.authService.getSession();

    if(this.typePage){
      this.goalsService.updateGoal(this.goal.id, this.goal)
          .subscribe({
            next: (goal) =>{
              this.router.navigateByUrl('goals/list');
            },
            error: (response)=>{
              console.log(response);
            }
      });
    } else{
      this.goalsService.addGoal(this.goal)
      .subscribe({
        next: (goal) =>{
          this.router.navigateByUrl('goals/list');
        },
        error: (response)=>{
          console.log(response);
        }
      });
    }
  }

  cancel(){
    this.router.navigateByUrl('goals/list');
  }
}
