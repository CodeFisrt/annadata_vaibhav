import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { annadata } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  apiUrl = environment.apiEndPoint;
  fileUploadUrl = "https://storeapi.gerasim.in/api/Customer/";

  constructor(private http: HttpClient) { }

  // Food Category
  getAllFoodCategory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.foodCategoryApiEndPoint.GetAllFoodCategory);
  }

  addBulkFoodCategory(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + annadata.foodCategoryApiEndPoint.AddBulkFoodCategory, obj);
  }

  deleteFoodCategoryByCategoryId(id: number): Observable<any[]> {
    return this.http.delete<any[]>(this.apiUrl + annadata.foodCategoryApiEndPoint.DeleteFoodCategoryByCategoryId + id);
  }

  // Food Item
  getAllFoodItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.foodItemApiEndPoint.GetAllFoodItems);
  }

  getFoodItemById(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.foodItemApiEndPoint.GetFoodItemById + id);
  }

  getAllFoodItemsByCategoryId(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + annadata.foodItemApiEndPoint.GetAllFoodItemsbyCatId + id);
  }

  addFoodItem(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + annadata.foodItemApiEndPoint.AddFoodItem, obj);
  }

  updateFoodItem(obj: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + annadata.foodItemApiEndPoint.UpdateFoodItem, obj);
  }

  deleteFoodItemByItemId(id: number): Observable<any[]> {
    return this.http.delete<any[]>(this.apiUrl + annadata.foodItemApiEndPoint.DeleteFoodItmeByItemId + id);
  }

  // File Upload
  fileUpload(obj: any): Observable<any> {
    return this.http.post<any>(this.fileUploadUrl + annadata.foodItemApiEndPoint.Upload, obj);
  }
}
