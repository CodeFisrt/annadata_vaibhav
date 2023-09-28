import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { farmerFoodItems, farmerObject } from 'src/app/core/models/classes/class';
import { city, district, foodCategory, foodItem, state, taluka } from 'src/app/core/models/interfaces/IUser';
import { FarmerService } from 'src/app/core/services/farmer.service';
import { FoodService } from 'src/app/core/services/food.service';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-add-new-farmer',
  templateUrl: './add-new-farmer.component.html',
  styleUrls: ['./add-new-farmer.component.css']
})
export class AddNewFarmerComponent implements OnInit {
  farmerObj: farmerObject;
  farmerFoodItemsObj: farmerFoodItems;
  foodItemArr: foodItem[];
  farmFoodItemArr: any[];
  stateArr: state[];
  districtArr: district[];
  talukaArr: taluka[];
  cityArr: city[];
  foodCategoryArr: foodCategory[];
  isApiCallInProgress: boolean;
  isTableVisible: boolean;
  fileUrl: string = 'http://storeapi.gerasim.in/customer/';// imageUrl to show uploaded files in  folder;
  selectedStateId: any = '';
  selectedDistrictId: any;
  selectedCityId: any;
  selectedFoodCategory: any;
  loggedUserData: any;
  currentId: number;

  constructor(private _food: FoodService, private _farmer: FarmerService, private _master: MasterService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.farmerObj = new farmerObject();
    this.farmerFoodItemsObj = new farmerFoodItems();
    this.foodItemArr = [];
    this.farmFoodItemArr = [];
    this.stateArr = [];
    this.districtArr = [];
    this.talukaArr = [];
    this.cityArr = [];
    this.foodCategoryArr = [];
    this.isApiCallInProgress = false;
    this.isTableVisible = false;
    this.currentId = 0;
    this._master.toggleFilterIcon(false);

    const localData = localStorage.getItem('localUserData');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    };

    this.activatedRoute.params.subscribe((res: any) => {
      this.currentId = res.farmerId;
    });
  }

  ngOnInit(): void {
    // this.loadAllFoodItem();
    this.loadAllStates();
    this.loadAllFoodCategory();
    if (this.currentId) {
      this.getFarmerByFarmerId();
    } else if (this.loggedUserData.role == 'Farmer') {
      this.getFarmerByFarmerId();
    }
  }

  // loadAllFoodItem() {
  //   this._food.getAllFoodItems().subscribe((res: any) => {
  //     if (res.result) {
  //       this.foodItemArr = res.data;
  //     }
  //   })
  // }

  loadAllStates() {
    this._master.getAllStates().subscribe((res: any) => {
      if (res.result) {
        this.stateArr = res.data;
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

  getDistrictByStateId() {
    this._master.getAllDistrictByStateId(this.selectedStateId).subscribe((res: any) => {
      this.districtArr = res.data;
    })
  }

  getAllCitiesByDistrictId() {
    this._master.getAllCitiesByDistrictId(this.selectedDistrictId).subscribe((res: any) => {
      this.cityArr = res.data;
    })
  }

  getAllTalukaByCityId() {
    this._master.getAllTalukaByCityId(this.selectedCityId).subscribe((res: any) => {
      this.talukaArr = res.data;
    })
  }

  getAllFoodItemsByCategoryId() {
    this._food.getAllFoodItemsByCategoryId(this.selectedFoodCategory).subscribe((res: any) => {
      this.foodItemArr = res.data;
    })
  }

  getFarmerByFarmerId() {
    if (this.currentId) {
      this._farmer.getFarmerById(this.currentId).subscribe((res: any) => {
        this.farmerObj = res.data;
      });
    } else if (this.loggedUserData.role == 'Farmer') {
      this._farmer.getFarmerById(this.loggedUserData.farmerId).subscribe((res: any) => {
        this.farmerObj = res.data;
      });
    }
  }

  addNewFarmer() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this.farmerObj.FarmerFoodItems = this.farmFoodItemArr;
      this._farmer.addNewFarmer(this.farmerObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success(res.message);
          this.onCancel();
        } else {
          this.isApiCallInProgress = false;
          this.toastr.error(res.message);
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
  }

  addFoodItemData() {
    debugger;
    // Check if farmerFoodItemsObj has a valid foodItemId
    if (this.farmerFoodItemsObj && this.farmerFoodItemsObj.foodItemId) {
      // const strObj = JSON.stringify(this.farmerFoodItemsObj);
      // const obj = JSON.parse(strObj);
      const local = this.foodItemArr.find((m: any) => m.foodItemId == this.farmerFoodItemsObj.foodItemId)
      //find food item from foodItemArr and assign food name to obj and then show that field in table;
      if (local) {
        this.farmFoodItemArr.push(local);
        this.isTableVisible = true;
      }
    }
  }

  onRemoveFoodItemData() {
    this.farmFoodItemArr = [];
    this.isTableVisible = false;
  }

  uploadImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.currentTarget.files[0];
      if (file) {
        debugger
        const fileSizeMB = file.size / (1024 * 1024); // Convert to MB
        const maxSizeMB = 5; // Maximum allowed size in MB
        if (fileSizeMB > maxSizeMB) {
          debugger
          this.toastr.error('File size should be less than 5 MB');
          return; // Return early to prevent further execution
        }
      }
      if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/jpg') {
        const formObj = new FormData();
        formObj.append('file', file);
        this._food.fileUpload(formObj).subscribe((res: any) => {
          if (res) {
            this.farmerObj.photoUrl = res;
          }
        });
      } else {
        this.toastr.error('Unsupported file type. Please select a JPEG or PNG image.');
      }
    }
  }

  onUpdateFarmer() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this.farmerObj.FarmerFoodItems = this.farmFoodItemArr;
      this._farmer.updateFarmerDetails(this.farmerObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success(res.message);
        } else {
          this.isApiCallInProgress = false;
          this.toastr.error(res.message);
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
   }

  onCancel() {
    this.farmerObj = new farmerObject();
    this.selectedStateId = undefined;
    this.selectedDistrictId = undefined;
    this.selectedCityId = undefined;
    this.selectedFoodCategory = undefined;
    this.farmerFoodItemsObj = new farmerFoodItems();
    this.onRemoveFoodItemData();
    this.router.navigateByUrl('add-new-farmer');
  }

}
