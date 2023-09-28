import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { bidObject, rfqObject, updateRfqObject } from 'src/app/core/models/classes/class';
import { foodCategory, foodItem } from 'src/app/core/models/interfaces/IUser';
import { FarmerService } from 'src/app/core/services/farmer.service';
import { FoodService } from 'src/app/core/services/food.service';
import { MasterService } from 'src/app/core/services/master.service';
import { RfqService } from 'src/app/core/services/rfq.service';

@Component({
  selector: 'app-create-rfq',
  templateUrl: './create-rfq.component.html',
  styleUrls: ['./create-rfq.component.css']
})
export class CreateRfqComponent implements OnInit {
  rfqObj: rfqObject;
  updateRfqObj: updateRfqObject;
  farmerArr: any[];
  foodCategoryArr: foodCategory[];
  foodItemArr: foodItem[];
  selectedFoodCategory: any;
  fileUrl: string = 'http://storeapi.gerasim.in/customer/';// imageUrl to show uploaded files in  folder;
  isApiCallInProgress: boolean;
  displayImagePopup: boolean;
  selectedImageUrl: string;
  currentId: number;
  bidObj: bidObject;
  displayModalBid: boolean;
  quotationArr: any[];
  loggedUserData: any;
  bidsByQuotationArr: any[];

  constructor(private _master: MasterService, private _farmer: FarmerService, private _food: FoodService, private _rfq: RfqService, private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.rfqObj = new rfqObject();
    this.updateRfqObj = new updateRfqObject();
    this.farmerArr = [];
    this.foodCategoryArr = [];
    this.foodItemArr = [];
    this.isApiCallInProgress = false;
    this.displayImagePopup = false;
    this.selectedImageUrl = '';
    this.currentId = 0;
    this.bidObj = new bidObject();
    this.displayModalBid = false;
    this.quotationArr = [];
    this.bidsByQuotationArr = [];

    this._master.toggleFilterIcon(false);
    const localData = localStorage.getItem('localUserData');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    };
    this.activatedRoute.params.subscribe((res: any) => {
      this.currentId = res.quotationId;
      if (this.currentId) {
        this.getRfqByQuotationId();
        if(this.loggedUserData.role =="Vendor") {
          this.GetBidsForQuotationById();
        } else {
          this.getAllBidsByQuotationId();
        }
      
      }
    });

    
  }

  ngOnInit(): void {
    this.loadAllFarmers();
    this.loadAllFoodCategory();
    
    this.getAllQuotation();
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

  loadAllFoodCategory() {
    this._food.getAllFoodCategory().subscribe((res: any) => {
      if (res.result) {
        this.foodCategoryArr = res.data;
      }
    })
  }

  getAllFoodItemsByCategoryId() {
    this._food.getAllFoodItemsByCategoryId(this.selectedFoodCategory).subscribe((res: any) => {
      this.foodItemArr = res.data;
    })
  }

  getRfqByQuotationId() {
    this._rfq.getRfqByQuotationId(this.currentId).subscribe((res: any) => {
      this.rfqObj = res.data;
    })
  }

  createRfq() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._rfq.createNewRfq(this.rfqObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success(res.message);
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

  onUpdateRfq() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._rfq.updateRfq(this.updateRfqObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success(res.message);
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
    this.rfqObj = new rfqObject();
    this.router.navigateByUrl('create-RFQ');
  }

  uploadImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.currentTarget.files[0];
      if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/jpg' && file.size <= 5000000) {
        const formObj = new FormData();
        formObj.append('file', file);
        this._food.fileUpload(formObj).subscribe((res: any) => {
          debugger
          this.rfqObj.photosUrls = res;
        })
      } else {
        if (file.size > 5000000) {
          this.toastr.info('Files size should be less than 1 mb');
        }
      }
    }
  }

  onOpenBid() {
    this.displayModalBid = true;
  }

  onAddBid() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this.bidObj.quotationId = this.currentId;
      this.bidObj.vendorId = this.loggedUserData.vendorId;
      this._rfq.addBid(this.bidObj).subscribe((res: any) => {
        debugger
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success(res.message);
          if(this.loggedUserData.role == "Vendor"){
            this.getAllBidsByQuotationId();
          }
          this.onCancelBid();
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

  onUpdateBid() { }

  getAllQuotation(){
    this._rfq.getAllQuotation().subscribe((res:any)=>{
      if(res.result){
        this.quotationArr = res.data;
      }
    })
  }

  getAllBidsByQuotationId() {
    this._rfq.getAllBidsByQuotationId(this.currentId).subscribe((res: any) => {
      if (res.result) {
        this.bidsByQuotationArr = res.data;
      }
    })
  }
  GetBidsForQuotationById() {
    this._rfq.GetBidsForQuotationById(this.currentId, this.loggedUserData.vendorId).subscribe((res: any) => {
      if (res.result) {
        this.bidsByQuotationArr = res.data;
      }
    })
  }

  onCancelBid() {
    this.bidObj = new bidObject();
    this.displayModalBid = false;
  }

  // Function to open the image popup
  showImagePopup(photosUrls: string) {
    this.selectedImageUrl = photosUrls;
    this.displayImagePopup = true;
  }

  // Function to close the image popup
  closeImagePopup() {
    this.displayImagePopup = false;
  }

}
