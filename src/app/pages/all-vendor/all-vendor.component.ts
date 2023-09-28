import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { vendorByFilterObject } from 'src/app/core/models/classes/class';
import { district, city, taluka } from 'src/app/core/models/interfaces/IUser';
import { MasterService } from 'src/app/core/services/master.service';
import { VendorService } from 'src/app/core/services/vendor.service';

@Component({
  selector: 'app-all-vendor',
  templateUrl: './all-vendor.component.html',
  styleUrls: ['./all-vendor.component.css']
})
export class AllVendorComponent implements OnInit {
  vendorArr: any[];
  vendorByFilterObj: vendorByFilterObject;
  districtArr: district[];
  cityArr: city[];
  talukaArr: taluka[];
  selectedDistrictId: any;
  selectedCityId: any;
  showBlock: boolean = false;

  constructor(private _vendor: VendorService, private _master: MasterService, private toastr: ToastrService, private router: Router, private confirm: ConfirmationService) {
    this.vendorByFilterObj = new vendorByFilterObject();
    this.vendorArr = [];
    this.districtArr = [];
    this.cityArr = [];
    this.talukaArr = [];

    this._master.toggleBlock$.subscribe(() => {
      this.showBlock = this._master.getShowBlock();
    });
    this._master.toggleFilterIcon(true);
  }

  ngOnInit(): void {
    this.loadAllDistrict();
    this.filterByVendor();
  }

  loadAllDistrict() {
    this._master.getAllDistricts().subscribe((res: any) => {
      if (res.result) {
        this.districtArr = res.data;
      }
    })
  }

  getAllCitiesByDistrictId() {
    this._master.getAllCitiesByDistrictId(this.selectedDistrictId).subscribe((res: any) => {
      if (res.result) {
        this.cityArr = res.data;
      }
    })
  }

  getAllTalukaByCityId() {
    this._master.getAllTalukaByCityId(this.selectedCityId).subscribe((res: any) => {
      if (res.result) {
        this.talukaArr = res.data;
      }
    })
  }

  filterByVendor() {
    this._vendor.getVendorsByFilter(this.vendorByFilterObj).subscribe((res: any) => {
      if (res.result) {
        this.vendorArr = res.data;
      }
    })
  }

  onEdit(id: number) {
    this.router.navigate(['/add-vendors', id]);
  }

  onDelete(id: number) {
    this.confirm.confirm({
      message: 'Are you sure that you want delete?',
      accept: () => {
        this._vendor.deleteVendorByVendorId(id).subscribe((res: any) => {
          if (res.result) {
            const index = this.vendorArr.findIndex((m: any) => m.foodCategoryId == id);
            this.vendorArr.splice(index, 1);
            this.toastr.error(res.message);
          }
        })
      }
    });
  }

  onResetFilterByVendor() {
    this.vendorByFilterObj = new vendorByFilterObject();
    this.selectedDistrictId = undefined;
    this.selectedCityId = undefined;
    this.filterByVendor();
  }

}
