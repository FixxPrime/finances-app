import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Type } from '../models/type.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllTypes(): Observable<Type[]>{
    return this.http.get<Type[]>(this.baseApiUrl + '/api/Types');
  }

  addType(addTypeRequest: Type): Observable<Type>{
    addTypeRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Type>(this.baseApiUrl + '/api/Types', addTypeRequest);
  }

  getType(id: string): Observable<Type>{
    return this.http.get<Type>(this.baseApiUrl + '/api/Types/' + id);
  }

  updateType(id: string, updateTypeRequest: Type): Observable<Type>{
    return this.http.put<Type>(this.baseApiUrl + '/api/Types/' + id, updateTypeRequest);
  }

  deleteType(id: string): Observable<Type>{
    return this.http.delete<Type>(this.baseApiUrl + '/api/Types/' + id);
  }
}
