import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  user: User = new User();

  constructor(private authService: AuthService,
              private router: Router){ }

  onSubmit(form: NgForm){
    this.authService.register(this.user)
    .subscribe({
      next: (id) =>{
        localStorage.setItem('session', id);
        this.router.navigateByUrl('/');
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }

}
