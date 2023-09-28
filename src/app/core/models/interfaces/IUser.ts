export interface city {
  cityName: string;
  cityId: number;
  districtName: string;
  stateName: string;
  districtId: number;
  isEdit: boolean;
}

export interface taluka {
  talukaName: string;
  talukaId: number;
  cityName: string;
  districtName: string;
  stateName: string;
  cityId: number;
  stateId: number;
  districtId: number;
}

export interface state {
  stateId: number;
  stateName: string;
  isEdit: boolean;
}

export interface district {
  districtName: string;
  districtId: number;
  stateName: string;
  stateId: number;
  isEdit: boolean;
}

export interface foodCategory {
  foodCategoryId: number;
  foodCategoryName: string;
  isActive: boolean;
  createdDate: Date;
  isEdit: boolean;
}

export interface foodItem {
  foodItemId: number;
  foodItemName: string;
  imageUrl: string;
  packagingType: string;
  shelfLifePeriod: string;
  foodCategoryName: string;
  foodCategoryId: number;
  isActive: boolean;
  createdDate: Date;
  isSeasonal: boolean;
  isEdit: boolean;
}

export class customer {
  customerId: number;
  name: string;
  mobileNo: string;
  talukaName: string;
  cityName: string;
  districtName: string;
  altMobNo: string;

  constructor() {
    this.customerId = 0;
    this.name = '';
    this.mobileNo = '';
    this.talukaName = '';
    this.cityName = '';
    this.districtName = '';
    this.altMobNo = '';
  }
}

export interface farmer {
  farmerId: number;
  fullName: string;
  aadharCardNo: string;
  talukaId: number;
  homeAddress: string;
  farmAddress: string;
  farmTotalAcre: string;
  isDryLandFarming: boolean;
  isFalbagAvailable: boolean;
  isWellAvailable: boolean;
  isOrganicFarming: boolean;
  isFarmHouse: boolean;
  isTourAvailable: boolean;
  createdDate: Date;
  isRoadAvailable: boolean;
  photoUrl: string;
  contactNo: string;
  altContactNo: string;
  isVerified: boolean;
  verifiedBy: number;
}

export interface IRfq {
  quotationId: number;
  farmerId: number;
  rfqName: string;
  foodItemId: number;
  quantity: string;
  quotationReleaseDate: Date;
  proposedRate: number;
  biddingStartDate: Date;
  biddingEndDate: Date;
  farmVisitStartDate: Date;
  farmVisitEndDate: Date;
  foodMaterialReadyDate: Date;
  isTransportationProvided: boolean;
  extraDetails: string;
  photosUrls: string;
}

export interface executive {
  highestEducation: string;
  mobileNo: string;
  name: string;
  parentExecutiveId: number;
  parentExecutiveName: string;
  talukaId: number;
  aadharNo: string;
  emailId: string;
  executiveId: number;
  talukaName: string
}
