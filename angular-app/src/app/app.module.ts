import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TransactionsListComponent } from './pages/transactions/transactions-list/transactions-list.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { TransactionCardComponent } from './pages/transactions/transaction-card/transaction-card.component';
import { TransactionDetailsComponent } from './pages/transactions/transaction-details/transaction-details.component';
import { GoalsListComponent } from './pages/goals/goals-list/goals-list.component';
import { GoalCardComponent } from './pages/goals/goal-card/goal-card.component';
import { GoalDetailsComponent } from './pages/goals/goal-details/goal-details.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { AuthMainLayoutComponent } from './pages/auth/auth-main-layout/auth-main-layout.component';
import { ChartsListComponent } from './pages/charts/charts-list/charts-list.component';
import { ChartLineComponent } from './pages/charts/chart-line/chart-line.component';
import { ChartPieComponent } from './pages/charts/chart-pie/chart-pie.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsListComponent,
    MainLayoutComponent,
    TransactionCardComponent,
    TransactionDetailsComponent,
    GoalsListComponent,
    GoalCardComponent,
    GoalDetailsComponent,
    LoginComponent,
    RegistrationComponent,
    AuthMainLayoutComponent,
    ChartsListComponent,
    ChartLineComponent,
    ChartPieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
