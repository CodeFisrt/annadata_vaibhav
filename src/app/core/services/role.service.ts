import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { annadata } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  // Executive:-
  getAllExecutives(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.executiveApiEndPoint.GetAllExecutive);
  }

  getDownlineExecutiveByExecutiveId(executiveId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.executiveApiEndPoint.GetDownlineExecutiveByExecutiveId + executiveId);
  }

  addUpdateExecutive(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + annadata.executiveApiEndPoint.AddUpdateExecutive, obj);
  }

  deleteExecutiveByExecutiveId(executiveId: number): Observable<any[]> {
    return this.http.delete<any[]>(this.apiUrl + annadata.executiveApiEndPoint.DeleteExecutiveByExecutiveId + executiveId);
  }
}
