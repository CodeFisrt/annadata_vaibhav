import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { rfqObject, updateRfqObject } from '../models/classes/class';
import { Observable } from 'rxjs';
import { annadata } from '../constant/constant';
import { IRfq } from '../models/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class RfqService {
  apiUrl = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  createNewRfq(obj: rfqObject): Observable<rfqObject> {
    return this.http.post<rfqObject>(this.apiUrl + annadata.rfqApiEndPoint.CreateNewRfq, obj);
  }

  updateRfq(obj: updateRfqObject): Observable<updateRfqObject> {
    return this.http.put<updateRfqObject>(this.apiUrl + annadata.rfqApiEndPoint.UpdateRfq, obj);
  }

  deleteRfqByRFQId(rfqId: number): Observable<IRfq[]> {
    return this.http.delete<IRfq[]>(this.apiUrl + annadata.rfqApiEndPoint.DeleteRfqByRFQId + rfqId);
  }

  getAllQuotation(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.rfqApiEndPoint.GetAllQuotation);
  }

  addBid(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + annadata.rfqApiEndPoint.AddBid, obj);
  }

  updateBid(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + annadata.rfqApiEndPoint.UpdateBid, obj);
  }

  deleteBidByBidId(bidId: number): Observable<any[]> {
    return this.http.delete<any[]>(this.apiUrl + annadata.rfqApiEndPoint.DeleteBidByBidId + bidId);
  }

  getAllQuotationBids(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.rfqApiEndPoint.GetAllQuotationBids);
  }

  getAllBidsByQuotationId(quotationId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.rfqApiEndPoint.GetAllBidsByQuotationId + quotationId);
  }
  GetBidsForQuotationById(quotationId: number, vendorId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.rfqApiEndPoint.GetBidsForQuotationById + quotationId+ "&vendorID="+vendorId);
  }

  getAllQuotationBidsByVendorId(vendorId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.rfqApiEndPoint.GetAllQuotationBidsByVendorId + vendorId);
  }

  getAllQuotationBidsByFarmerId(farmerId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.rfqApiEndPoint.GetAllQuotationBidsByFarmerId + farmerId);
  }

  getRfqByQuotationId(quotationId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.rfqApiEndPoint.getRfqByQuotationId + quotationId);
  }
}
