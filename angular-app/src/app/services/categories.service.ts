import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.baseApiUrl + '/api/Categories');
  }

  addCategory(addCategoryRequest: Category): Observable<Category>{
    addCategoryRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Category>(this.baseApiUrl + '/api/Categories', addCategoryRequest);
  }

  getCategory(id: string): Observable<Category>{
    return this.http.get<Category>(this.baseApiUrl + '/api/Categories/' + id);
  }

  updateCategory(id: string, updateCategoryRequest: Category): Observable<Category>{
    return this.http.put<Category>(this.baseApiUrl + '/api/Categories/' + id, updateCategoryRequest);
  }

  deleteCategory(id: string): Observable<Category>{
    return this.http.delete<Category>(this.baseApiUrl + '/api/Categories/' + id);
  }
}
