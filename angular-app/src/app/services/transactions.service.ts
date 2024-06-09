import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Transaction } from '../models/transaction.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllTransactions(idUser: string): Observable<Transaction[]>{
    const params = new HttpParams().set('idUser', idUser);
    return this.http.get<Transaction[]>(this.baseApiUrl + '/api/Transactions', {params});
  }

  getAllTransactionsId(idUser: string): Observable<string[]>{
    const params = new HttpParams().set('idUser', idUser);
    return this.http.get<string[]>(this.baseApiUrl + '/api/Transactions/ids', {params});
  }

  getAllTransactionsIdByText(textRequest: string, dateStart: Date, dateEnd: Date, idUser: string): Observable<string[]>{
    let params = new HttpParams().set('idUser', idUser).set('text', textRequest);
  
    if(dateStart && !isNaN(dateStart.getTime())) {
      params = params.set('dateStart', dateStart.toISOString());
    }
    
    if(dateEnd && !isNaN(dateEnd.getTime())) {
      params = params.set('dateEnd', dateEnd.toISOString());
    }
    
    return this.http.get<string[]>(this.baseApiUrl + '/api/Transactions/search/', {params});
  }

  addTransaction(addTransactionRequest: Transaction): Observable<Transaction>{
    addTransactionRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Transaction>(this.baseApiUrl + '/api/Transactions', addTransactionRequest);
  }

  getTransaction(id: string): Observable<Transaction>{
    return this.http.get<Transaction>(this.baseApiUrl + '/api/Transactions/' + id);
  }

  updateTransaction(id: string, updateTransactionRequest: Transaction): Observable<Transaction>{
    return this.http.put<Transaction>(this.baseApiUrl + '/api/Transactions/' + id, updateTransactionRequest);
  }

  deleteTransaction(id: string): Observable<Transaction>{
    return this.http.delete<Transaction>(this.baseApiUrl + '/api/Transactions/' + id);
  }
}
