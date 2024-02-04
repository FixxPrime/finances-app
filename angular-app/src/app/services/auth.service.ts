import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  login(login: string, password: string): Observable<string> {
    const params = new HttpParams().set('login', login).set('password', password);
    return this.http.get<string>(this.baseApiUrl + '/api/Auth', { params });
  }

  register(user: User): Observable<string> {
    return this.http.post<string>(this.baseApiUrl + '/api/Auth', user);
  }

  isAuthenticated(){
    if(localStorage.getItem('session')){
      return true;
    } else{
      return false;
    }
  }

  getSession(){
    const session = localStorage.getItem('session');
    if (!session)
      return "NotFound";
    return session;
  }

  logout(){
    localStorage.removeItem('session');
  }
}
