import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';
import { trigger, transition, style, animate, query, stagger} from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
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
export class TransactionsListComponent implements OnInit{

  isLoading = true;
  transactions: string[] = [];

  constructor(private transactionsService: TransactionsService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllTransactionsId();
  }
  
  getAllTransactionsId(){
    this.transactionsService.getAllTransactionsId(this.authService.getSession())
    .subscribe({
      next: (transactionsIds) =>{
        this.isLoading = false;
        this.transactions = transactionsIds;
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }

  deleteTransaction(id: string){
    this.transactionsService.deleteTransaction(id)
    .subscribe({
      next: () =>{
        this.getAllTransactionsId();
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }

  search(textRequest: string){
    this.isLoading = true;

    var dateStartElement = <HTMLInputElement> document.getElementById('dateStart');
    var dateStart = new Date(dateStartElement.value);

    var dateEndElement = <HTMLInputElement> document.getElementById('dateEnd');
    var dateEnd = new Date(dateEndElement.value);

    this.transactionsService.getAllTransactionsIdByText(textRequest.trim(), dateStart, dateEnd, this.authService.getSession())
    .subscribe({
      next: (transactionsIds) =>{
        this.isLoading = false;
        this.transactions = transactionsIds;
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }

  searchTransactions(textRequest: string){
    this.isLoading = true;

    var dateStartElement = <HTMLInputElement> document.getElementById('dateStart');
    var dateStart = new Date(dateStartElement.value);

    var dateEndElement = <HTMLInputElement> document.getElementById('dateEnd');
    var dateEnd = new Date(dateEndElement.value);

    this.transactionsService.getAllTransactionsIdByText(textRequest.trim(), dateStart, dateEnd, this.authService.getSession())
    .subscribe({
      next: (transactionsIds) =>{
        this.isLoading = false;
        this.transactions = transactionsIds;
      },
      error: (response)=>{
        console.log(response);
      }
    });
  }
}
