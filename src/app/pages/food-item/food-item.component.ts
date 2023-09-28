import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { foodItemObject } from 'src/app/core/models/classes/class';
import { foodCategory, foodItem } from 'src/app/core/models/interfaces/IUser';
import { FoodService } from 'src/app/core/services/food.service';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit {
  foodItemObj: foodItemObject;
  foodItemArr: foodItem[];
  filteredFoodItemArr: foodItem[];
  foodCategoryArr: foodCategory[];
  displayModalFoodItem: boolean;
  isApiCallInProgress: boolean;
  fileUrl: string = 'http://storeapi.gerasim.in/customer/';// imageUrl to show uploaded files in  folder;
  displayImagePopup: boolean;
  selectedImageUrl: string;

  constructor(private _food: FoodService, private toastr: ToastrService, private confirm: ConfirmationService, private _master: MasterService) {
    this.foodItemObj = new foodItemObject();
    this.foodItemArr = [];
    this.filteredFoodItemArr = [];
    this.foodCategoryArr = [];
    this.displayModalFoodItem = false;
    this.displayImagePopup = false;
    this.selectedImageUrl = '';
    this.isApiCallInProgress = false;
    this._master.toggleFilterIcon(false);
    this._master.search.subscribe((res: any) => {
      const search = res.toLowerCase(); // Convert the search string to lowercase
      this.filteredFoodItemArr = this.foodItemArr.filter((searchData: any) => {
        const values = Object.values(searchData);
        let flag = false;
        values.forEach((val: any) => {
          if (val.toString().toLowerCase().indexOf(search) > -1) {
            flag = true;
            return;
          }
        });
        if (flag) {
          return searchData;
        }
      });
    });
  }

  ngOnInit(): void {
    this.loadAllFoodItem();
    this.loadAllFoodCategory();
  }

  onAddFoodCategory() {
    this.displayModalFoodItem = true;
    this.onReset();
  }

  loadAllFoodItem() {
    this._master.showLoader.next(true);
    this._food.getAllFoodItems().subscribe((res: any) => {
      if (res.result) {
        this.foodItemArr = res.data;
        this.filteredFoodItemArr = res.data;
        this._master.showLoader.next(false);
      }
    })
  }

  loadAllFoodCategory() {
    this._food.getAllFoodCategory().subscribe((res: any) => {
      if (res.result) {
        this.foodCategoryArr = res.data;
      }
    })
  }

  onSaveFoodItem() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._food.addFoodItem(this.foodItemObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success(res.message);
          this.displayModalFoodItem = false;
          this.loadAllFoodItem();
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
  }

  uploadImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.currentTarget.files[0];
      if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/jpg' && file.size <= 5000000) {
        const formObj = new FormData();
        formObj.append('file', file);
        this._food.fileUpload(formObj).subscribe((res: any) => {
          this.foodItemObj.imageUrl = res;
        })
      } else {
        if (file.size > 5000000) {
          this.toastr.info('Files size should be less than 1 mb');
        }
      }
    }
  }

  onEdit(item: foodItem) {
    this._food.getFoodItemById(item.foodItemId).subscribe((res: any) => {
      this.foodItemObj = res.data;
      this.displayModalFoodItem = true;
    })
  }

  onUpdateFoodItem() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._food.updateFoodItem(this.foodItemObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success(res.message);
          this.displayModalFoodItem = false;
          this.loadAllFoodItem();
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
  }

  onDelete(item: foodItem) {
    this.confirm.confirm({
      message: 'Are you sure that you want delete?',
      accept: () => {
        this._food.deleteFoodItemByItemId(item.foodItemId).subscribe((res: any) => {
          if (res.result) {
            const index = this.filteredFoodItemArr.findIndex((m: any) => m.foodItemId == item.foodItemId);
            this.filteredFoodItemArr.splice(index, 1);
            this.toastr.error(res.message);
          }
        });
      }
    });
  }

  onCancel() {
    this.displayModalFoodItem = false;
  }

  onReset() {
    this.foodItemObj = new foodItemObject();
  }

  // Function to open the image popup
  showImagePopup(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
    this.displayImagePopup = true;
  }

  // Function to close the image popup
  closeImagePopup() {
    this.displayImagePopup = false;
  }
}
