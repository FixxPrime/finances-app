import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Transaction } from 'src/app/models/transaction.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {

  @Output('updatebalance') updateBalanceEvent: EventEmitter<void> = new EventEmitter<void>();

  typePage: boolean = false;
  transaction: Transaction = new Transaction();
  categories: Category[] = [];
  date = new Date();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private transactionsService: TransactionsService,
              private categoriesService: CategoriesService,
              private authService: AuthService) { }


  onSubmit(form: NgForm){
    var calendar = <HTMLInputElement> document.getElementById('calendar');
    this.transaction.date = new Date(calendar.value);

    this.transaction.userId = this.authService.getSession();

    if(this.typePage){

      this.transactionsService.updateTransaction(this.transaction.id, this.transaction)
          .subscribe({
            next: (transaction) =>{
              this.updateBalanceEvent.emit();
              this.router.navigateByUrl('transactions/list');
            },
            error: (response)=>{
              console.log(response);
            }
      });
    } else{
      this.transactionsService.addTransaction(this.transaction)
      .subscribe({
        next: (transaction) =>{
          this.updateBalanceEvent.emit();
          this.router.navigateByUrl('transactions/list');
        },
        error: (response)=>{
          console.log(response);
        }
      });
    }
  }

  ngOnInit(){
    this.route.paramMap.subscribe({
      next: (params) =>{
        const id = params.get('id');

        if(id){
          this.typePage = true;

          this.transactionsService.getTransaction(id)
          .subscribe({
            next: (transaction) =>{
              this.transaction = transaction;
            },
            error: (response)=>{
              this.router.navigateByUrl('transactions/list');
              console.log(response);
            }
          });
        } else{
          var today = new Date();
          this.transaction.date = new Date();
          this.transaction.typeId = "67e156e9-aee4-44ea-a016-f628f7a954eb";
          this.transaction.categoryId = "67e156e9-aee4-44ea-a016-f628f7a00013";
        }
      }
    })

    this.categoriesService.getAllCategories()
          .subscribe({
            next: (categories) =>{
              this.categories = categories;
            },
            error: (response)=>{
              console.log(response);
            }
          });
  }

  cancel(){
    this.router.navigateByUrl('transactions/list');
  }

}
