import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Category } from 'src/app/models/category.model';
import { Transaction } from 'src/app/models/transaction.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { MinioService } from 'src/app/services/minio.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss']
})
export class TransactionCardComponent implements OnInit{

  @Input('transactionId') transactionId: string;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  transaction: Transaction = new Transaction();
  category: Category = new Category();
  
  ExpenseColor: string = '#9B4454';
  IncomeColor: string = '#ABBD85';
  iconsrc: SafeUrl;

  constructor(private transactionsService: TransactionsService,
              private categoryService: CategoriesService,
              private minIOService: MinioService){ }

  ngOnInit(): void {
    this.category.icon = "white-small-square";
    this.transactionsService.getTransaction(this.transactionId)
    .subscribe({
      next: (transaction) =>{
        this.transaction = transaction;

        this.categoryService.getCategory(this.transaction.categoryId)
        .subscribe({
          next: (category) =>{
            this.category = category;

            this.minIOService.getIconCategory(this.category.icon)
            .subscribe({
              next: (iconsrc) =>{
                this.iconsrc = iconsrc;
              },
              error: (response)=>{
                console.log(response);
              }
            });
          },
          error: (response)=>{
            console.log(response);
          }
        });
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
