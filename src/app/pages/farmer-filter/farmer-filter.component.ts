import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { farmersByFilterObject } from 'src/app/core/models/classes/class';
import { city, district, farmer, taluka } from 'src/app/core/models/interfaces/IUser';
import { FarmerService } from 'src/app/core/services/farmer.service';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-farmer-filter',
  templateUrl: './farmer-filter.component.html',
  styleUrls: ['./farmer-filter.component.css']
})
export class FarmerFilterComponent implements OnInit {
  filterFarmerObj: farmersByFilterObject;
  farmerArr: farmer[];
  districtArr: district[];
  cityArr: city[];
  talukaArr: taluka[];
  selectedDistrictId: any;
  selectedCityId: any;
  showBlock: boolean = false;

  constructor(private _farmer: FarmerService, private _master: MasterService, private toastr: ToastrService, private router: Router,private confirm: ConfirmationService) {
    this.filterFarmerObj = new farmersByFilterObject();
    this.farmerArr = [];
    this.districtArr = [];
    this.cityArr = [];
    this.talukaArr = [];

    this._master.toggleBlock$.subscribe(() => {
      this.showBlock = this._master.getShowBlock();
    });
    this._master.toggleFilterIcon(true);
  }

  ngOnInit(): void {
    // this.loadAllFarmers();
    this.filterByFarmer();
    this.loadAllDistrict();
  }

  loadAllFarmers() {
    this._master.showLoader.next(true);
    this._farmer.getAllFarmers().subscribe((res: any) => {
      if (res.result) {
        this.farmerArr = res.data;
        this._master.showLoader.next(false);
      }
    })
  }

  filterByFarmer() {
    this._master.showLoader.next(true);
    this._farmer.getFarmersByFilter(this.filterFarmerObj).subscribe((res: any) => {
      this.farmerArr = res.data;
      this._master.showLoader.next(false);
    })
  }

  onResetFilterByFarmer() {
    this.filterFarmerObj = new farmersByFilterObject();
    this.selectedDistrictId = undefined;
    this.selectedCityId = undefined;
    this.filterByFarmer();
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

  onEdit(id:number){
    this.router.navigate(['/add-new-farmer', id]);
  }

  onDelete(id: number) {
    this.confirm.confirm({
      message: 'Are you sure that you want delete?',
      accept: () => {
        this._farmer.deleteFarmerByFarmerId(id).subscribe((res: any) => {
          if (res.result) {
            const index = this.farmerArr.findIndex((m: any) => m.farmerId == id);
            this.farmerArr.splice(index, 1);
            this.toastr.error(res.message);
          }
        })
      }
    });
  }

}
