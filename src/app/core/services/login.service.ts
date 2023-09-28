import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { annadata } from '../constant/constant';
import { loginObject } from '../models/classes/class';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  login(obj: loginObject): Observable<loginObject> {
    return this.http.post<loginObject>(this.apiUrl + annadata.loginApiEndPoint.login, obj);
  }
}
