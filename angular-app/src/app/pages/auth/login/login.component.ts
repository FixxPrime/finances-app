import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = "";
  password: string = "";
  isInvalid = false;

  constructor(private authService: AuthService,
              private router: Router){}

  onSubmit(form: NgForm){
    this.isInvalid = false;
    this.authService.login(this.email, this.password)
    .subscribe({
      next: (id) =>{
        localStorage.setItem('session', id);
        this.router.navigateByUrl('/');
      },
      error: (response)=>{
        console.log(response);
        if (response.status === 404) {
          this.isInvalid = true;
        }
      }
    });
  }

}
