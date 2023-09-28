import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { vendorObject, verifyVendor } from '../models/classes/class';
import { Observable } from 'rxjs';
import { annadata } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  apiUrl = environment.apiEndPoint;

  constructor(private http: HttpClient) { }
  getVendorById(vendorId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.vendorApiEndPoint.GetVendorById + vendorId);
  }

  getVendorsByFilter(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + annadata.vendorApiEndPoint.GetVendorsByFilter, obj);
  }

  addNewVendor(obj: vendorObject): Observable<vendorObject> {
    return this.http.post<vendorObject>(this.apiUrl + annadata.vendorApiEndPoint.AddNewVendor, obj);
  }

  updateVendor(obj: vendorObject): Observable<vendorObject> {
    return this.http.put<vendorObject>(this.apiUrl + annadata.vendorApiEndPoint.UpdateVendor, obj);
  }

  deleteVendorByVendorId(vendorId: number): Observable<any[]> {
    return this.http.delete<any[]>(this.apiUrl + annadata.vendorApiEndPoint.DeleteVendorByVendorId + vendorId);
  }

  verifyVendor(obj: verifyVendor): Observable<verifyVendor> {
    return this.http.post<verifyVendor>(this.apiUrl + annadata.vendorApiEndPoint.VerifyVendor, obj);
  }
}
