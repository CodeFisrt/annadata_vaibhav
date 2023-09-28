import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { cityObject } from 'src/app/core/models/classes/class';
import { city } from 'src/app/core/models/interfaces/IUser';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-city-master',
  templateUrl: './city-master.component.html',
  styleUrls: ['./city-master.component.css']
})
export class CityMasterComponent implements OnInit {
  cityObj: cityObject;
  cityArr: any[];
  filteredCityArr: any[];
  stateArr: any[];
  districtArr: any[];
  selectedStateId: any;
  selectedDistrictId: any;
  oldObj: any;
  isApiCallInProgress: boolean;

  constructor(private _master: MasterService, private toastr: ToastrService) {
    this.cityObj = new cityObject();
    this.cityArr = [];
    this.filteredCityArr = [];
    this.stateArr = [];
    this.districtArr = [];
    this.isApiCallInProgress = false;
    this._master.toggleFilterIcon(false);

    this._master.search.subscribe((res: any) => {
      const search = res.toLowerCase(); // Convert the search string to lowercase
      this.filteredCityArr = this.cityArr.filter((searchData: any) => {
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
    this.loadAllStates();
    this.loadAllCities();
  }

  onAddCity() {
    const editCount = this.cityArr.filter((m: any) => m.isEdit == true);
    if (editCount.length == 0) {
      this.cityArr.unshift(this.cityObj);
      this.onReset();
    }
  }

  loadAllCities() {
    this._master.getAllCities().subscribe((res: any) => {
      if (res.result) {
        this.cityArr = res.data;
        this.filteredCityArr = res.data;
      }
    })
  }

  loadAllStates() {
    this._master.showLoader.next(true);
    this._master.getAllStates().subscribe((res: any) => {
      this.stateArr = res.data;
      this._master.showLoader.next(false);
    })
  }

  getDistrictByStateId() {
    this._master.getAllDistrictByStateId(this.selectedStateId).subscribe((res: any) => {
      this.districtArr = res.data;
    })
  }

  onSave() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._master.addBulkCity(this.cityArr).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success(res.message);
          this.loadAllCities();
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
  }

  onUpdate() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._master.addBulkCity(this.cityArr).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success(res.message);
          this.loadAllCities();
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
  }

  onEdit(item: city) {
    this.oldObj = JSON.stringify(item);
    this.cityArr.forEach((element: any) => {
      element.isEdit = false;
    });
    item.isEdit = true;
  }

  onCancel(item: city) {
    if (item.cityId == 0) {
      this.cityArr.splice(0, 1);
      this.selectedStateId = undefined;
    } else {
      item.isEdit = false;
      const old = JSON.parse(this.oldObj);
      item.stateName = old.stateName;
      item.districtName = old.districtName;
      item.cityName = old.cityName;
    }
  }

  onReset() {
    this.cityObj = new cityObject();
  }

  isFormValid(item: any): boolean {
    return item.stateId !== 0 && item.districtId !== 0 && item.cityName.trim() !== '';
  }

}
