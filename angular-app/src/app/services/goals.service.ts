import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Goal } from '../models/goal.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllGoals(idUser: string): Observable<Goal[]>{
    const params = new HttpParams().set('idUser', idUser);
    return this.http.get<Goal[]>(this.baseApiUrl + '/api/Goals', {params});
  }

  getAllGoalsId(idUser: string): Observable<string[]>{
    const params = new HttpParams().set('idUser', idUser);
    return this.http.get<string[]>(this.baseApiUrl + '/api/Goals/ids', {params});
  }

  getAllGoalsIdByText(textRequest: string, idUser: string): Observable<string[]>{
    const params = new HttpParams().set('idUser', idUser);
    return this.http.get<string[]>(this.baseApiUrl + '/api/Goals/' + textRequest, {params});
  }

  addGoal(addGoalRequest: Goal): Observable<Goal>{
    addGoalRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Goal>(this.baseApiUrl + '/api/Goals', addGoalRequest);
  }

  getGoal(id: string): Observable<Goal>{
    return this.http.get<Goal>(this.baseApiUrl + '/api/Goals/' + id);
  }

  getPercent(id: string, idUser: string): Observable<number> {
    const params = new HttpParams().set('idUser', idUser);
    return this.http.get<number>(this.baseApiUrl + '/api/Goals/percent/' + id, { params });
  }

  updateGoal(id: string, updateGoalRequest: Goal): Observable<Goal>{
    return this.http.put<Goal>(this.baseApiUrl + '/api/Goals/' + id, updateGoalRequest);
  }

  deleteGoal(id: string): Observable<Goal>{
    return this.http.delete<Goal>(this.baseApiUrl + '/api/Goals/' + id);
  }
}
