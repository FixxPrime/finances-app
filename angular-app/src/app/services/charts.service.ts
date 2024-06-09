import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getLineBalance(idUser: string): Observable<any[]>{
    const params = new HttpParams().set('idUser', idUser);
    return this.http.get<any[]>(this.baseApiUrl + '/api/Charts/line/balance', {params});
  }

  getLineBalanceByDate(dateStart: Date, dateEnd: Date, idUser: string): Observable<any[]>{
    let params = new HttpParams().set('idUser', idUser);

    if(dateStart && !isNaN(dateStart.getTime())) {
      params = params.set('dateStart', dateStart.toISOString());
    }
    
    if(dateEnd && !isNaN(dateEnd.getTime())) {
      params = params.set('dateEnd', dateEnd.toISOString());
    }

    return this.http.get<any[]>(this.baseApiUrl + '/api/Charts/line/balance', {params});
  }

  getPieExpense(idUser: string): Observable<any[]>{
    const params = new HttpParams().set('idUser', idUser);
    return this.http.get<any[]>(this.baseApiUrl + '/api/Charts/pie/expense', {params});
  }

  getPieExpenseByDate(dateStart: Date, dateEnd: Date, idUser: string): Observable<any[]>{
    let params = new HttpParams().set('idUser', idUser);

    if(dateStart && !isNaN(dateStart.getTime())) {
      params = params.set('dateStart', dateStart.toISOString());
    }
    
    if(dateEnd && !isNaN(dateEnd.getTime())) {
      params = params.set('dateEnd', dateEnd.toISOString());
    }

    return this.http.get<any[]>(this.baseApiUrl + '/api/Charts/pie/expense', {params});
  }

  getPieIncome(idUser: string): Observable<any[]>{
    const params = new HttpParams().set('idUser', idUser);
    return this.http.get<any[]>(this.baseApiUrl + '/api/Charts/pie/income', {params});
  }

  getPieIncomeByDate(dateStart: Date, dateEnd: Date, idUser: string): Observable<any[]>{
    let params = new HttpParams().set('idUser', idUser);

    if(dateStart && !isNaN(dateStart.getTime())) {
      params = params.set('dateStart', dateStart.toISOString());
    }
    
    if(dateEnd && !isNaN(dateEnd.getTime())) {
      params = params.set('dateEnd', dateEnd.toISOString());
    }
    
    return this.http.get<any[]>(this.baseApiUrl + '/api/Charts/pie/income', {params});
  }
}
