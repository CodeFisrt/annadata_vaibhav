import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { annadata } from '../constant/constant';
import { cityObject, loginObject, stateObject } from '../models/classes/class';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { city, state, taluka } from '../models/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiUrl = environment.apiEndPoint;

  constructor(private http: HttpClient) { }
  public showLoader = new Subject<boolean>();
  // toggle filter icon in navbar
  private showBlock: boolean = false; // Track block visibility
  private toggleBlockSubject = new Subject<void>();
  toggleBlock$ = this.toggleBlockSubject.asObservable();
  // Method to toggle block visibility
  toggleBlock() {
    this.showBlock = !this.showBlock;
    this.toggleBlockSubject.next();
  }
  // Method to get the current block visibility state
  getShowBlock() {
    return this.showBlock;
  }
  // hide/show filter icon as per requirement
  private showFilterIconSubject = new BehaviorSubject<boolean>(false);
  showFilterIcon$: Observable<boolean> = this.showFilterIconSubject.asObservable();

  toggleFilterIcon(show: boolean) {
    this.showFilterIconSubject.next(show);
  }
  public search = new Subject<string>();

  // City:-
  getAllCities(): Observable<city[]> {
    return this.http.get<city[]>(this.apiUrl + annadata.cityApiEndPoint.GetAllCities);
  }

  getAllCitiesByDistrictId(districtId: number): Observable<city[]> {
    return this.http.get<city[]>(this.apiUrl + annadata.cityApiEndPoint.GetAllCitiesByDistrictId + districtId);
  }

  addBulkCity(obj: any): Observable<cityObject> {
    return this.http.post<cityObject>(this.apiUrl + annadata.cityApiEndPoint.AddBulkCity, obj);
  }

  // State:-
  getAllStates(): Observable<state[]> {
    return this.http.get<state[]>(this.apiUrl + annadata.stateApiEndPoint.GetAllState);
  }

  addState(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + annadata.stateApiEndPoint.AddBulkState, obj);
  }

  // District:-
  getAllDistricts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.districtApiEndPoint.GetAllDistrict);
  }

  getAllDistrictByStateId(stateId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.districtApiEndPoint.GetAllDistrictByStateId + stateId);
  }

  addDistricts(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + annadata.districtApiEndPoint.AddBulkDistrict, obj);
  }

  // Taluka:-
  getAllTaluka(): Observable<taluka[]> {
    return this.http.get<taluka[]>(this.apiUrl + annadata.talukaApiEndPoint.GetAllTaluka);
  }

  addTaluka(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + annadata.talukaApiEndPoint.AddTaluka, obj);
  }

  getAllTalukaByCityId(cityId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.talukaApiEndPoint.GetAllTalukaByCityId + cityId);
  }

  // dashboard:-
  getAdminDashboardData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.dashboardApiEndPoint.GetAdminDashboardData);
  }

  getVendorDashboardById(vendorId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.dashboardApiEndPoint.GetVendorDashboardById + vendorId);
  }

  getFarmerDashboardById(farmerId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.dashboardApiEndPoint.GetFarmerDashboardById + farmerId);
  }
}
