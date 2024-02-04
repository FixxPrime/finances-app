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

  getPieExpense(idUser: string): Observable<any[]>{
    const params = new HttpParams().set('idUser', idUser);
    return this.http.get<any[]>(this.baseApiUrl + '/api/Charts/pie/expense', {params});
  }

  getPieIncome(idUser: string): Observable<any[]>{
    const params = new HttpParams().set('idUser', idUser);
    return this.http.get<any[]>(this.baseApiUrl + '/api/Charts/pie/income', {params});
  }
}
