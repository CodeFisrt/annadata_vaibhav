export class loginObject {
  userName: string;
  password: string;

  constructor() {
    this.userName = '';
    this.password = '';
  }
}

export class cityObject {
  cityId: number;
  cityName: string;
  districtId: number;
  isEdit: boolean;

  constructor() {
    this.cityId = 0;
    this.cityName = '';
    this.districtId = 0;
    this.isEdit = true;
  }
}

export class talukaObject {
  talukaId: number;
  talukaName: string;
  cityId: number;

  constructor() {
    this.talukaId = 0;
    this.talukaName = '';
    this.cityId = 0;
  }
}

export class stateObject {
  stateId: number;
  stateName: string;
  isEdit: boolean;

  constructor() {
    this.stateId = 0;
    this.stateName = '';
    this.isEdit = true;
  }
}

export class districtObject {
  districtId: number;
  districtName: string;
  stateId: number;
  stateName: string;
  isEdit: boolean;

  constructor() {
    this.districtId = 0;
    this.districtName = '';
    this.stateId = 0;
    this.stateName = '';
    this.isEdit = true;
  }
}

export class foodCategoryObject {
  foodCategoryId: number;
  foodCategoryName: string;
  isActive: boolean;
  createdDate: Date;
  isEdit: boolean;

  constructor() {
    this.foodCategoryId = 0;
    this.foodCategoryName = '';
    this.isActive = false;
    this.createdDate = new Date();
    this.isEdit = true;
  }
}

export class foodItemObject {
  foodItemId: number;
  foodCategoryId: number;
  foodItemName: string;
  isActive: boolean;
  createdDate: Date;
  isSeasonal: boolean;
  packagingType: string;
  shelfLifePeriod: string;
  imageUrl: string;
  isEdit: boolean;

  constructor() {
    this.foodItemId = 0;
    this.foodCategoryId = 0;
    this.foodItemName = '';
    this.isActive = false;
    this.createdDate = new Date();
    this.isSeasonal = false;
    this.packagingType = '';
    this.shelfLifePeriod = '';
    this.imageUrl = '';
    this.isEdit = true;
  }
}

export class customerObject {
  customerId: number;
  name: string;
  mobileNo: string;
  altMobNo: string;
  emailId: string;
  aadharCardNo: string;
  createdOn: Date;
  talukaId: number;

  constructor() {
    this.customerId = 0;
    this.name = '';
    this.mobileNo = '';
    this.altMobNo = '';
    this.emailId = '';
    this.aadharCardNo = '';
    this.createdOn = new Date();
    this.talukaId = 0;
  }
}

export class farmerObject {
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
  // FarmerFoodItems: farmerFoodItems[];
  FarmerFoodItems: any[];

  constructor() {
    this.farmerId = 0;
    this.fullName = '';
    this.aadharCardNo = '';
    this.talukaId = 0;
    this.homeAddress = '';
    this.farmAddress = '';
    this.farmTotalAcre = '';
    this.isDryLandFarming = false;
    this.isFalbagAvailable = false;
    this.isWellAvailable = false;
    this.isOrganicFarming = false;
    this.isFarmHouse = false;
    this.isTourAvailable = false;
    this.createdDate = new Date();
    this.isRoadAvailable = false;
    this.photoUrl = '';
    this.contactNo = '';
    this.altContactNo = '';
    this.FarmerFoodItems = [];
  }
}

export class farmerFoodItems {
  farmerFoodItemId: number;
  foodItemId: number;
  farmerId: number;

  constructor() {
    this.farmerFoodItemId = 0;
    this.foodItemId = 0;
    this.farmerId = 0;
  }
}

export class farmersByFilterObject {
  farmerId: number;
  fullName: string;
  aadharCardNo: string;
  talukaId: null;
  cityId: null;
  districtId: null;
  isDryLandFarming: boolean;
  isFalbagAvailable: boolean;
  isOrganicFarming: boolean;
  isFarmHouse: boolean;
  isTourAvailable: boolean;
  contactNo: string;

  constructor() {
    this.farmerId = 0;
    this.fullName = '';
    this.aadharCardNo = '';
    this.talukaId = null;
    this.cityId = null;
    this.districtId = null;
    this.isDryLandFarming = true;
    this.isFalbagAvailable = true;
    this.isOrganicFarming = true;
    this.isFarmHouse = true;
    this.isTourAvailable = true;
    this.contactNo = '';
  }
}

export class verifyFarmer {
  farmerId: 0;
  executiveId: 0;

  constructor() {
    this.farmerId = 0;
    this.executiveId = 0;
  }
}

export class rfqObject {
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

  constructor() {
    this.quotationId = 0;
    this.farmerId = 0;
    this.rfqName = '';
    this.foodItemId = 0;
    this.quantity = '';
    this.quotationReleaseDate = new Date();
    this.proposedRate = 0;
    this.biddingStartDate = new Date();
    this.biddingEndDate = new Date();
    this.farmVisitStartDate = new Date();
    this.farmVisitEndDate = new Date();
    this.foodMaterialReadyDate = new Date();
    this.isTransportationProvided = false;
    this.extraDetails = '';
    this.photosUrls = '';
  }
}

export class updateRfqObject {
  quotationId: number;
  farmerId: number;
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
  quotationAwardedTo: number;
  awardedRate: number;
  awardedDate: Date;
  rfqName: string;

  constructor() {
    this.quotationId = 0;
    this.farmerId = 0;
    this.foodItemId = 0;
    this.quantity = '';
    this.quotationReleaseDate = new Date();
    this.proposedRate = 0;
    this.biddingStartDate = new Date();
    this.biddingEndDate = new Date();
    this.farmVisitStartDate = new Date();
    this.farmVisitEndDate = new Date();
    this.foodMaterialReadyDate = new Date();
    this.isTransportationProvided = false;
    this.extraDetails = '';
    this.photosUrls = '';
    this.quotationAwardedTo = 0;
    this.awardedRate = 0;
    this.awardedDate = new Date();
    this.rfqName = '';
  }
}

export class vendorObject {
  vendorId: number;
  vendorName: string;
  contactNo: string;
  altContactNo: string;
  emailId: string;
  gstNo: string;
  isShopAvailable: boolean;
  personalPanNo: string;
  businessPanNo: string;
  shopAddess: string;
  homeAddress: string;
  shopTalukaId: number;
  homeTalukaId: number;
  createdDate: Date;
  isOwnTransporation: boolean;
  isVerified: boolean;
  verifiedBy: number;

  constructor() {
    this.vendorId = 0;
    this.vendorName = '';
    this.contactNo = '';
    this.altContactNo = '';
    this.emailId = '';
    this.gstNo = '';
    this.isShopAvailable = false;
    this.personalPanNo = '';
    this.businessPanNo = '';
    this.shopAddess = '';
    this.homeAddress = '';
    this.shopTalukaId = 0;
    this.homeTalukaId = 0;
    this.createdDate = new Date();
    this.isOwnTransporation = false;
    this.isVerified = false;
    this.verifiedBy = 0;
  }
}

export class vendorByFilterObject {
  vendorName: string;
  contactNo: string;
  gstNo: string;
  shopTalukaId: null;
  cityId: null;
  districtId: null;

  constructor() {
    this.vendorName = '';
    this.contactNo = '';
    this.gstNo = '';
    this.shopTalukaId = null;
    this.cityId = null;
    this.districtId = null;
  }
}

export class verifyVendor {
  vendorId: 0;
  executiveId: 0;

  constructor() {
    this.vendorId = 0;
    this.executiveId = 0;
  }
}

export class executiveObject {
  executiveId: number;
  name: string;
  mobileNo: string;
  emailId: string;
  talukaId: number;
  highestEducation: string;
  aadharNo: string;
  parentExecutiveId: number;

  constructor() {
    this.executiveId = 0;
    this.name = '';
    this.mobileNo = '';
    this.emailId = '';
    this.talukaId = 0;
    this.highestEducation = '';
    this.aadharNo = '';
    this.parentExecutiveId = 0;
  }
}

export class bidObject {
  bidId: number;
  quotationId: number;
  userId: number;
  quotedRate: number;
  naration: string;
  isAwarded: boolean;
  vendorId: number;

  constructor() {
    this.bidId = 0;
    this.quotationId = 0;
    this.userId = 0;
    this.quotedRate = 0;
    this.naration = '';
    this.isAwarded = false;
    this.vendorId = 0;
  }
}

export class adminDashboardObject {
  totalRfq: number;
  totalBids: number;
  totalFarmer: number;
  totalVendor: number;
  totalCustomer: number;
  totalFoodCategories: number;
  totalFoodItems: number;

  constructor() {
    this.totalRfq = 0;
    this.totalBids = 0;
    this.totalFarmer = 0;
    this.totalVendor = 0;
    this.totalCustomer = 0;
    this.totalFoodCategories = 0;
    this.totalFoodItems = 0;
  }
}

export class vendorDashboardObject {
  totalRfq: number;
  totalBids: number;
  totalBidsAwarded: number;

  constructor() {
    this.totalRfq = 0;
    this.totalBids = 0;
    this.totalBidsAwarded = 0;
  }
}
export class farmerDashboardObject {
  totalRfqCreated: number;
  totalBidsReceived: number;
  totalBidsAwarded: number;

  constructor() {
    this.totalRfqCreated = 0;
    this.totalBidsReceived = 0;
    this.totalBidsAwarded = 0;
  }
}
