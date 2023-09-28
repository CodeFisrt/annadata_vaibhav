import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { customerObject } from 'src/app/core/models/classes/class';
import { customer, taluka } from 'src/app/core/models/interfaces/IUser';
import { CustomerService } from 'src/app/core/services/customer.service';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customerObj: customerObject;
  customerArr: customer[];
  filteredCustomerArr: customer[];
  talukaArr: taluka[];
  displayModalCustomer: boolean;
  isApiCallInProgress: boolean;
  showBlock: boolean = false;
  constructor(private _customer: CustomerService, private _master: MasterService, private toastr: ToastrService) {
    this.customerObj = new customerObject();
    this.customerArr = [];
    this.filteredCustomerArr = [];
    this.talukaArr = [];
    this.displayModalCustomer = false;
    this.isApiCallInProgress = false;
    this._master.toggleFilterIcon(false);

    this._master.search.subscribe((res: any) => {
      const search = res.toLowerCase(); // Convert the search string to lowercase
      this.filteredCustomerArr = this.customerArr.filter((searchData: any) => {
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
    })
  }

  ngOnInit(): void {
    this.loadAllCustomer();
    this.loadAllTaluka();
  }

  onAddCustomer() {
    this.displayModalCustomer = true;
    this.onReset();
  }

  loadAllTaluka() {
    this._master.getAllTaluka().subscribe((res: any) => {
      if (res.result) {
        this.talukaArr = res.data;
      }
    })
  }

  loadAllCustomer() {
    this._master.showLoader.next(true);
    this._customer.getAllCustomers().subscribe((res: any) => {
      if (res.result) {
        this.customerArr = res.data;
        this.filteredCustomerArr = res.data;
        this._master.showLoader.next(false);
      }
    })
  }

  onSaveCustomer() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._customer.addUpdateCustomer(this.customerObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success(res.message);
          this.displayModalCustomer = false;
          this.loadAllCustomer();
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

  onEdit(item: customer) {
    this._customer.getCustomerById(item.customerId).subscribe((res: any) => {
      this.customerObj = res.data;
      this.displayModalCustomer = true;
    })
  }

  onUpdateCustomer() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._customer.addUpdateCustomer(this.customerObj).subscribe((res: any) => {
        console.log(res);
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success(res.message);
          this.displayModalCustomer = false;
          this.loadAllCustomer();
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
  }

  onDelete(item: customer) {
    this._customer.deleteCustomerByCustomerId(item.customerId).subscribe((res: any) => {
      if (res.result) {
        this.toastr.error(res.message);
        this.loadAllCustomer();
      }
    })
  }

  onCancel() {
    this.displayModalCustomer = false;
  }

  onReset() {
    this.customerObj = new customerObject();
  }

}
