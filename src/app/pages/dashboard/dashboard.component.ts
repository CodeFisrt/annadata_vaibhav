import { Component, OnInit } from '@angular/core';
import { adminDashboardObject, farmerDashboardObject, vendorDashboardObject } from 'src/app/core/models/classes/class';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  adminDashboardObj: adminDashboardObject;
  vendorDashboardObj: vendorDashboardObject;
  farmerDashboardObj: farmerDashboardObject;
  loggedUserData: any;
  adminDashboardArr: any[];
  vendorDashboardArr: any[];
  farmerDashboardArr: any[];
  counterValue = 0;

  constructor(private _master: MasterService) {
    this.adminDashboardObj = new adminDashboardObject();
    this.vendorDashboardObj = new vendorDashboardObject();
    this.farmerDashboardObj = new farmerDashboardObject();
    this.adminDashboardArr = [];
    this.vendorDashboardArr = [];
    this.farmerDashboardArr = [];

    const localData = localStorage.getItem('localUserData');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    };
  }

  ngOnInit(): void {
    if (this.loggedUserData.role == 'admin') {
      this.getAdminDashboardData();
    } else if (this.loggedUserData.role == 'Vendor') {
      this.getVendorDashboardByVendorId();
    } else if (this.loggedUserData.role == 'Farmer') {
      this.getFarmerDashboardByFarmerId();
    }
  }

  getAdminDashboardData() {
    this._master.getAdminDashboardData().subscribe((res: any) => {
      this.adminDashboardArr = res.data;
      this.adminDashboardArr.forEach((item, index) => {
        item.counter = index + 1;
      });
      this.adminDashboardObj = this.adminDashboardArr[0];
    });
  }

  getVendorDashboardByVendorId() {
    this._master.getVendorDashboardById(this.loggedUserData.vendorId).subscribe((res: any) => {
      this.vendorDashboardArr = res.data;
      this.vendorDashboardArr.forEach((item, index) => {
        item.counter = index + 1;
      });
      this.vendorDashboardObj = this.vendorDashboardArr[0];
    });
  }

  getFarmerDashboardByFarmerId() {
    this._master.getFarmerDashboardById(this.loggedUserData.farmerId).subscribe((res: any) => {
      this.farmerDashboardArr = res.data;
      this.farmerDashboardArr.forEach((item, index) => {
        item.counter = index + 1;
      });
      this.farmerDashboardObj = this.farmerDashboardArr[0];
    });
  }
}
