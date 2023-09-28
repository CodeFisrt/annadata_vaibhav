import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { vendorObject } from 'src/app/core/models/classes/class';
import { InternetService } from 'src/app/core/services/internet.service';
import { MasterService } from 'src/app/core/services/master.service';
import { VendorService } from 'src/app/core/services/vendor.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  icon: string = 'pi pi-filter';
  class: string = 'p-button-rounded p-button-primary';
  searchTxt: string = '';
  showFilterIcon: boolean = false;
  switchLang: any;
  browserLang: any;
  isOnline: boolean = true;
  noInternetImageSrc = "assets/images/no-internet-image.png?{{ cacheBuster }}";
  cacheBuster: string = new Date().getTime().toString(); // Generate a cache-busting value
  loggedUserData: any;
  vendorObj: vendorObject;

  constructor(public _master: MasterService, private router: Router, private confirmationService: ConfirmationService, private toastr: ToastrService, private _vendor: VendorService, private _internet: InternetService) {
    this._master.showFilterIcon$.subscribe((show: boolean) => {
      this.showFilterIcon = show;
    });

    this._internet.onlineStatus$.subscribe((status: any) => {
      this.isOnline = status;
      // console.log('Online Status:', status);
      this.cacheBuster = new Date().getTime().toString(); // Update the cache-busting value
    });

    const localData = localStorage.getItem('localUserData');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    };
    this.vendorObj = new vendorObject();
  }

  ngOnInit(): void {
    if (this.loggedUserData.role == 'Vendor') {
      this.getVendorById();
    }
  }

  toggleBlocks() {
    this._master.toggleBlock();
    this.icon = this.icon === 'pi pi-filter' ? 'pi pi-times' : 'pi pi-filter';
    this.class = this.class === 'p-button-rounded p-button-primary' ? 'p-button-rounded p-button-danger' : 'p-button-rounded p-button-primary';
  }

  onSearch(event: any) {
    this._master.search.next(event);
  }

  getVendorById() {
    this._vendor.getVendorById(this.loggedUserData.vendorId).subscribe((res: any) => {
      this.vendorObj = res.data;
    })
  }

  onLogOut() {
    this.confirmationService.confirm({
      message: 'Are you sure that you wan to log out?',
      accept: () => {
        localStorage.removeItem('localUserData');
        this.toastr.success('Logged Out Successfully');
        this.router.navigateByUrl('login');
      }
    });
  }

}
