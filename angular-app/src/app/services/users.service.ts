import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.baseApiUrl + '/api/Users');
  }

  addUser(addUserRequest: User): Observable<User>{
    addUserRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<User>(this.baseApiUrl + '/api/Users', addUserRequest);
  }

  getUser(id: string): Observable<User>{
    return this.http.get<User>(this.baseApiUrl + '/api/Users/' + id);
  }

  updateUser(id: string, updateUserRequest: User): Observable<User>{
    return this.http.put<User>(this.baseApiUrl + '/api/Users/' + id, updateUserRequest);
  }

  deleteUser(id: string): Observable<User>{
    return this.http.delete<User>(this.baseApiUrl + '/api/Users/' + id);
  }
}
