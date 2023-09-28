import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { foodCategoryObject } from 'src/app/core/models/classes/class';
import { foodCategory } from 'src/app/core/models/interfaces/IUser';
import { FoodService } from 'src/app/core/services/food.service';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-food-category',
  templateUrl: './food-category.component.html',
  styleUrls: ['./food-category.component.css']
})
export class FoodCategoryComponent implements OnInit {
  foodCategoryObj: foodCategoryObject;
  foodCategoryArr: foodCategory[];
  filteredFoodCategoryArr: foodCategory[];
  oldObj: any;
  isApiCallInProgress: boolean;

  constructor(private _food: FoodService, private toastr: ToastrService, private _master: MasterService, private confirm: ConfirmationService) {
    this.foodCategoryObj = new foodCategoryObject();
    this.foodCategoryArr = [];
    this.filteredFoodCategoryArr = [];
    this.isApiCallInProgress = false;
    this._master.toggleFilterIcon(false);

    this._master.search.subscribe((res: any) => {
      const search = res.toLowerCase(); // Convert the search string to lowercase
      this.filteredFoodCategoryArr = this.foodCategoryArr.filter((searchData: any) => {
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
    this.loadAllFoodCategory();
  }

  onAddFoodCategory() {
    const editCount = this.foodCategoryArr.filter((m: any) => m.isEdit == true);
    if (editCount.length == 0) {
      this.foodCategoryArr.unshift(this.foodCategoryObj);
      this.onReset();
    }
  }

  loadAllFoodCategory() {
    this._master.showLoader.next(true);
    this._food.getAllFoodCategory().subscribe((res: any) => {
      if (res.result) {
        this.foodCategoryArr = res.data;
        this.filteredFoodCategoryArr = res.data;
        this._master.showLoader.next(false);
      }
    })
  }

  onSaveFoodCategory() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._food.addBulkFoodCategory(this.foodCategoryArr).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success(res.message);
          this.loadAllFoodCategory();
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
  }

  onEdit(item: foodCategory) {
    this.oldObj = JSON.stringify(item);
    this.foodCategoryArr.forEach((element: any) => {
      element.isEdit = false;
    });
    item.isEdit = true;
  }

  onUpdateFoodCategory() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._food.addBulkFoodCategory(this.foodCategoryArr).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success(res.message);
          this.loadAllFoodCategory();
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
  }

  onDelete(item: foodCategory) {
    this.confirm.confirm({
      message: 'Are you sure that you want delete?',
      accept: () => {
        this._food.deleteFoodCategoryByCategoryId(item.foodCategoryId).subscribe((res: any) => {
          if (res.result) {
            const index = this.filteredFoodCategoryArr.findIndex((m: any) => m.foodCategoryId == item.foodCategoryId);
            this.filteredFoodCategoryArr.splice(index, 1);
            this.toastr.error(res.message);
          }
        })
      }
    });
  }

  onCancel(item: foodCategory) {
    if (item.foodCategoryId == 0) {
      this.foodCategoryArr.splice(0, 1);
    } else {
      item.isEdit = false;
      const old = JSON.parse(this.oldObj);
      item.foodCategoryName = old.foodCategoryName;
      item.isActive = old.isActive;
    }
  }

  onReset() {
    this.foodCategoryObj = new foodCategoryObject();
  }

  isFormValid(item: any): boolean {
    return item.foodCategoryName.trim() !== '';
  }

}
