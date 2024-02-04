import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsListComponent } from './pages/transactions/transactions-list/transactions-list.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { TransactionDetailsComponent } from './pages/transactions/transaction-details/transaction-details.component';
import { GoalsListComponent } from './pages/goals/goals-list/goals-list.component';
import { GoalDetailsComponent } from './pages/goals/goal-details/goal-details.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { AuthMainLayoutComponent } from './pages/auth/auth-main-layout/auth-main-layout.component';
import { authGuard } from './guards/auth.guard';
import { nonAuthGuard } from './guards/non-auth.guard';
import { ChartsListComponent } from './pages/charts/charts-list/charts-list.component';
import { ChartLineComponent } from './pages/charts/chart-line/chart-line.component';
import { ChartPieComponent } from './pages/charts/chart-pie/chart-pie.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, canActivate: [authGuard],children:[
    { path: 'transactions/list', component: TransactionsListComponent },
    { path: 'transactions/new', component: TransactionDetailsComponent},
    { path: 'transactions/:id', component: TransactionDetailsComponent},
    { path: 'goals/list', component: GoalsListComponent},
    { path: 'goals/new', component: GoalDetailsComponent},
    { path: 'goals/:id', component: GoalDetailsComponent},
    { path: 'charts', component: ChartsListComponent,children:[
      { path: 'line/balance', component: ChartLineComponent },
      { path: 'pie/:type', component: ChartPieComponent }
    ]}
  ]},
  {path: 'auth', component: AuthMainLayoutComponent, canActivate: [nonAuthGuard],children:[
    { path: 'login', component: LoginComponent},
    { path: 'registration', component: RegistrationComponent}
  ]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
