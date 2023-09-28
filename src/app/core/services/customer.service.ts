import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { annadata } from '../constant/constant';
import { customer } from '../models/interfaces/IUser';
import { customerObject } from '../models/classes/class';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<customer[]> {
    return this.http.get<customer[]>(this.apiUrl + annadata.customerApiEndPoint.GetAllCustomers);
  }

  getCustomerById(customerId:number): Observable<customer[]> {
    return this.http.get<customer[]>(this.apiUrl + annadata.customerApiEndPoint.GetCustomerById + customerId);
  }

  addUpdateCustomer(obj: customerObject): Observable<customerObject> {
    return this.http.post<customerObject>(this.apiUrl + annadata.customerApiEndPoint.AddUpdateCustomer, obj);
  }

  deleteCustomerByCustomerId(customerId:number): Observable<customer[]> {
    return this.http.delete<customer[]>(this.apiUrl + annadata.customerApiEndPoint.DeleteCustomerByCustomerId + customerId);
  }
}
