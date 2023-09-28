import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { executiveObject } from 'src/app/core/models/classes/class';
import { executive, taluka } from 'src/app/core/models/interfaces/IUser';
import { MasterService } from 'src/app/core/services/master.service';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-executive',
  templateUrl: './executive.component.html',
  styleUrls: ['./executive.component.css']
})
export class ExecutiveComponent implements OnInit {
  executiveObj: executiveObject;
  executiveArr: executive[];
  filteredExecutiveArr: executive[];
  talukaArr: taluka[];
  displayModalExecutive: boolean;
  isApiCallInProgress: boolean;

  constructor(private _role: RoleService, private _master: MasterService, private toastr: ToastrService, private confirm: ConfirmationService) {
    this.executiveObj = new executiveObject();
    this.executiveArr = [];
    this.filteredExecutiveArr = [];
    this.talukaArr = [];
    this.displayModalExecutive = false;
    this.isApiCallInProgress = false;
    this._master.toggleFilterIcon(false);
    this._master.search.subscribe((res: any) => {
      const search = res.toLowerCase(); // Convert the search string to lowercase
      this.filteredExecutiveArr = this.executiveArr.filter((searchData: any) => {
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
    this.loadExecutives();
    this.loadAllTaluka();
  }

  onAddExecutive() {
    this.displayModalExecutive = true;
    this.onReset();
  }

  loadExecutives() {
    this._master.showLoader.next(true);
    this._role.getAllExecutives().subscribe((res: any) => {
      this.executiveArr = res.data;
      this.filteredExecutiveArr = res.data;
      this._master.showLoader.next(false);
    })
  }

  loadAllTaluka() {
    this._master.getAllTaluka().subscribe((res: any) => {
      this.talukaArr = res.data;
    });
  }

  saveExecutive() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._role.addUpdateExecutive(this.executiveObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false
          this.loadExecutives();
          this.cancelExecutive();
          this.toastr.success(res.message);
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
  }

  updateExecutive() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._role.addUpdateExecutive(this.executiveObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false
          this.loadExecutives();
          this.cancelExecutive();
          this.toastr.success(res.message);
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
  }

  onEdit(item: executive) {
    // this._role.getDownlineExecutiveByExecutiveId(item.executiveId).subscribe((res: any) => {
    //   if (res.result) {
    //     this.executiveObj = res.data;
    //     this.displayModalExecutive = true;
    //   }
    // });
    this.executiveObj = item;
    this.displayModalExecutive = true;
  }

  onDelete(item: executive) {
    this.confirm.confirm({
      message: 'Are you sure that you want delete?',
      accept: () => {
        this._role.deleteExecutiveByExecutiveId(item.executiveId).subscribe((res: any) => {
          if (res.result) {
            const index = this.filteredExecutiveArr.findIndex((m: any) => m.executiveId == item.executiveId);
            this.filteredExecutiveArr.splice(index, 1);
            this.toastr.error(res.message);
          }
        })
      }
    });
  }

  onReset() {
    this.executiveObj = new executiveObject();
  }

  cancelExecutive() {
    this.executiveObj = new executiveObject();
    this.displayModalExecutive = false;
  }

}
