import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Dropdown } from 'primeng/dropdown';
import { talukaObject } from 'src/app/core/models/classes/class';
import { state, taluka } from 'src/app/core/models/interfaces/IUser';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-taluka',
  templateUrl: './taluka.component.html',
  styleUrls: ['./taluka.component.css']
})
export class TalukaComponent implements OnInit {
  talukaObj: talukaObject;
  talukaArr: taluka[];
  filteredTalukaArr: taluka[];
  stateArr: state[];
  districtArr: any[];
  cityArr: any[];
  displayModalTaluka: boolean;
  selectedStateId: any;
  selectedDistrictId: any;
  isTableLoader: boolean;
  isApiCallInProgress: boolean;
  @ViewChild('myDropdown') myDropdown!: Dropdown;

  constructor(private _master: MasterService, private toastr: ToastrService) {
    this.talukaObj = new talukaObject();
    this.talukaArr = [];
    this.filteredTalukaArr = [];
    this.stateArr = [];
    this.districtArr = [];
    this.cityArr = [];
    this.displayModalTaluka = false;
    this.isTableLoader = true;
    this.isApiCallInProgress = false;
    this._master.toggleFilterIcon(false);
    this._master.search.subscribe((res: any) => {
      const search = res.toLowerCase(); // Convert the search string to lowercase
      this.filteredTalukaArr = this.talukaArr.filter((searchData: any) => {
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
    this.loadAllTaluka();
    this.loadAllStates();
  }

  onAddTaluka() {
    this.displayModalTaluka = true;
    this.cancelTaluka();
  }

  loadAllTaluka() {
    this._master.showLoader.next(true);
    this._master.getAllTaluka().subscribe((res: any) => {
      this.talukaArr = res.data;
      this.filteredTalukaArr = res.data;
      this._master.showLoader.next(false);
    })
  }

  loadAllStates() {
    this._master.getAllStates().subscribe((res: any) => {
      this.stateArr = res.data;
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

  saveTaluka() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._master.addTaluka(this.talukaObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false
          this.loadAllTaluka();
          this.displayModalTaluka = false;
          this.toastr.success(res.message);
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
  }

  onEditTaluka(item: taluka) {
    this.displayModalTaluka = true;
    this.talukaObj = item;
  }

  updateTaluka() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._master.addTaluka(this.talukaObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false
          this.loadAllTaluka();
          this.displayModalTaluka = false;
          this.toastr.success(res.message);
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
  }

  resetDropdown() {
    if (this.myDropdown) {
      this.myDropdown.resetFilter();
    }
  }

  cancelTaluka() {
    this.selectedStateId = undefined;
    this.selectedDistrictId = undefined;
    this.talukaObj = new talukaObject();
    this.resetDropdown();
  }

  isFormValid(item: any): boolean {
    return item.stateId !== 0 && item.districtName.trim() !== '';
  }
}
