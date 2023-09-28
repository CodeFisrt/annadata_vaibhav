import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { stateObject } from 'src/app/core/models/classes/class';
import { state } from 'src/app/core/models/interfaces/IUser';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {
  stateObj: stateObject;
  stateArr: state[];
  filteredStateArr: state[];
  isApiCallInProgress: boolean;
  oldObj: any;

  constructor(private _master: MasterService, private toastr: ToastrService) {
    this.stateObj = new stateObject();
    this.stateArr = [];
    this.filteredStateArr = [];
    this.isApiCallInProgress = false;
    this._master.toggleFilterIcon(false);
    this._master.search.subscribe((res: any) => {
      const search = res.toLowerCase(); // Convert the search string to lowercase
      this.filteredStateArr = this.stateArr.filter((searchData: any) => {
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
  }

  onAddState() {
    const editCount = this.stateArr.filter((m: any) => m.isEdit == true);
    if (editCount.length == 0) {
      this.stateArr.unshift(this.stateObj);
      this.onReset();
    }
  }

  loadAllStates() {
    this._master.showLoader.next(true);
    this._master.getAllStates().subscribe((res: any) => {
      if (res.result) {
        this.stateArr = res.data;
        this.filteredStateArr = res.data;
        this._master.showLoader.next(false);
      }
    })
  }

  onEdit(item: state) {
    this.stateArr.forEach((element: any) => {
      element.isEdit = false;
    });
    this.oldObj = JSON.stringify(item);
    item.isEdit = true;
  }

  onSaveState() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._master.addState(this.stateArr).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false
          this.loadAllStates();
          this.toastr.success(res.message);
          this.onReset();
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
  }

  onUpdateState() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._master.addState(this.stateArr).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false
          this.loadAllStates();
          this.toastr.success(res.message);
          this.onReset();
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
  }

  onCancel(item: state) {
    if (item.stateId == 0) {
      this.stateArr.splice(0, 1);
    } else {
      item.isEdit = false;
      const old = JSON.parse(this.oldObj);
      item.stateName = old.stateName;
    }
  }

  onReset() {
    this.stateObj = new stateObject();
  }

  isFormValid(item: any): boolean {
    return item.stateName.trim() !== '';
  }

}
