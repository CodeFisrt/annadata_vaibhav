import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { vendorObject } from 'src/app/core/models/classes/class';
import { state, district, taluka, city } from 'src/app/core/models/interfaces/IUser';
import { MasterService } from 'src/app/core/services/master.service';
import { VendorService } from 'src/app/core/services/vendor.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent implements OnInit {
  vendorObj: vendorObject;
  stateArr: state[];
  districtArr: district[];
  talukaArr: taluka[];
  cityArr: city[];
  stateHomeArr: state[];
  districtHomeArr: district[];
  talukaHomeArr: taluka[];
  cityHomeArr: city[];
  selectedStateId: any;
  selectedDistrictId: any;
  selectedCityId: any;
  selectedHomeStateId: any;
  selectedHomeDistrictId: any;
  selectedHomeCityId: any;
  isApiCallInProgress: boolean;
  currentId: number;
  loggedUserData: any;

  constructor(private router: Router, private _vendor: VendorService, private _master: MasterService, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.vendorObj = new vendorObject();
    this.stateArr = [];
    this.districtArr = [];
    this.talukaArr = [];
    this.cityArr = [];
    this.stateHomeArr = [];
    this.districtHomeArr = [];
    this.talukaHomeArr = [];
    this.cityHomeArr = [];
    this.isApiCallInProgress = false;
    this.currentId = 0;
    this._master.toggleFilterIcon(false);

    this.activatedRoute.params.subscribe((res: any) => {
      this.currentId = res.vendorId;
    });

    const localData = localStorage.getItem('localUserData');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    };
  }

  ngOnInit(): void {
    this.loadAllStates();
    this.loadAllHomeStates();
    if (this.currentId) {
      this.getVendorById();
    }
    if(this.loggedUserData.role == 'Vendor'){
      this.getVendorById();
    }
  }

  loadAllStates() {
    this._master.getAllStates().subscribe((res: any) => {
      if (res.result) {
        this.stateArr = res.data;
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

  getVendorById() {
    if(this.currentId){
      this._vendor.getVendorById(this.currentId).subscribe((res: any) => {
        this.vendorObj = res.data;
      })
    }else if(this.loggedUserData.role == 'Vendor'){
      this._vendor.getVendorById(this.loggedUserData.vendorId).subscribe((res: any) => {
        this.vendorObj = res.data;
      })
    }

  }

  loadAllHomeStates() {
    this._master.getAllStates().subscribe((res: any) => {
      if (res.result) {
        this.stateHomeArr = res.data;
      }
    })
  }

  getHomeDistrictByStateId() {
    this._master.getAllDistrictByStateId(this.selectedHomeStateId).subscribe((res: any) => {
      this.districtHomeArr = res.data;
    })
  }

  getAllHomeCitiesByDistrictId() {
    this._master.getAllCitiesByDistrictId(this.selectedHomeDistrictId).subscribe((res: any) => {
      this.cityHomeArr = res.data;
    })
  }

  getAllHomeTalukaByCityId() {
    this._master.getAllTalukaByCityId(this.selectedHomeCityId).subscribe((res: any) => {
      this.talukaHomeArr = res.data;
    })
  }

  addNewVendor() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._vendor.addNewVendor(this.vendorObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success(res.message);
          this.router.navigateByUrl('all-vendors');
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

  onUpdateVendor() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._vendor.updateVendor(this.vendorObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success(res.message);
          this.router.navigateByUrl('all-vendors');
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
    this.vendorObj = new vendorObject();
    this.router.navigateByUrl('add-vendors');
  }
}
