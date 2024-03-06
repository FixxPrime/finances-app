import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinioService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getIconCategory(name: string): Observable<string>{
    return this.http.get<any>(this.baseApiUrl + '/api/MinIO/icon/' + name);
  }
}
