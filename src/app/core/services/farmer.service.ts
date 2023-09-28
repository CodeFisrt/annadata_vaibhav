import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { annadata } from '../constant/constant';
import { farmer } from '../models/interfaces/IUser';
import { Observable } from 'rxjs';
import { farmerObject, farmersByFilterObject, verifyFarmer } from '../models/classes/class';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  apiUrl = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  getAllFarmers(): Observable<farmer[]> {
    return this.http.get<farmer[]>(this.apiUrl + annadata.farmerApiEndPoint.GetAllFarmers);
  }

  getFarmersByFilter(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + annadata.farmerApiEndPoint.GetFarmersByFilter, obj);
  }

  getFarmerById(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.farmerApiEndPoint.GetFarmerById + id);
  }
  addNewFarmer(obj: farmerObject): Observable<farmerObject> {
    return this.http.post<farmerObject>(this.apiUrl + annadata.farmerApiEndPoint.AddNewFarmer, obj);
  }

  updateFarmerDetails(obj: farmerObject): Observable<farmerObject> {
    return this.http.post<farmerObject>(this.apiUrl + annadata.farmerApiEndPoint.UpdateFarmerDetails, obj);
  }

  deleteFarmerByFarmerId(farmerId: number): Observable<farmer[]> {
    return this.http.delete<farmer[]>(this.apiUrl + annadata.farmerApiEndPoint.DeleteFarmerByFarmerId + farmerId);
  }

  verifyFarmer(obj: verifyFarmer): Observable<verifyFarmer> {
    return this.http.post<verifyFarmer>(this.apiUrl + annadata.farmerApiEndPoint.VerifyFarmer, obj);
  }
}
