import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit{

  user: User = new User();

  constructor(private router: Router,
              private authService: AuthService,
              private userService: UsersService) {}

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigateByUrl('transactions/list');
    }

    this.userService.getUser(this.authService.getSession())
    .subscribe({
      next: (user) =>{
        this.user = user;
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('auth/login');
  }

  updateUserInformation(){
    this.userService.getUser(this.authService.getSession())
    .subscribe({
      next: (user) =>{
        this.user = user;
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }
}
