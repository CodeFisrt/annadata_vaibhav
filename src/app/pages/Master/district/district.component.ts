import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { districtObject } from 'src/app/core/models/classes/class';
import { district, state } from 'src/app/core/models/interfaces/IUser';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  districtObj: districtObject;
  districtArr: district[];
  filteredDistrictArr: district[];
  stateArr: state[];
  isApiCallInProgress: boolean;
  oldObj: any;

  constructor(private _master: MasterService, private toastr: ToastrService) {
    this.districtObj = new districtObject();
    this.districtArr = [];
    this.filteredDistrictArr = [];
    this.stateArr = [];
    this.isApiCallInProgress = false;
    this._master.toggleFilterIcon(false);
    this._master.search.subscribe((res: any) => {
      const search = res.toLowerCase(); // Convert the search string to lowercase
      this.filteredDistrictArr = this.districtArr.filter((searchData: any) => {
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
    this.loadAllDistrict();
  }

  onAddDistrict() {
    const editCount = this.districtArr.filter((m: any) => m.isEdit == true);
    if (editCount.length == 0) {
      this.districtArr.unshift(this.districtObj);
      this.onReset();
    }
  }

  loadAllStates() {
    this._master.getAllStates().subscribe((res: any) => {
      if (res.result) {
        this.stateArr = res.data;
      }
    })
  }

  loadAllDistrict() {
    this._master.showLoader.next(true);
    this._master.getAllDistricts().subscribe((res: any) => {
      if (res.result) {
        this.districtArr = res.data;
        this.filteredDistrictArr = res.data;
        this._master.showLoader.next(false);
      }
    })
  }

  onSaveDistrict() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._master.addDistricts(this.districtArr).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false
          this.loadAllDistrict();
          this.toastr.success(res.message);
          this.onReset();
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
  }

  onEdit(item: any) {
    this.districtArr.forEach((el: any) => {
      el.isEdit = false;
    });
    this.oldObj = JSON.stringify(item);
    item.isEdit = true;
  }

  onUpdateDistrict() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._master.addDistricts(this.districtArr).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false
          this.loadAllDistrict();
          this.toastr.success(res.message);
          this.onReset();
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
  }

  onCancel(item: any) {
    if (item.districtId == 0) {
      this.districtArr.splice(0, 1);
    } else {
      item.isEdit = false;
      const old = JSON.parse(this.oldObj);
      item.districtName = old.districtName;
      item.stateName = old.stateName;
    }
  }

  onReset() {
    this.districtObj = new districtObject();
  }

  isFormValid(item: any): boolean {
    return item.stateId !== 0 && item.districtName.trim() !== '';
  }
}
