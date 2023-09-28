export const annadata = {
  loginApiEndPoint: {
    login: 'login'
  },
  cityApiEndPoint: {
    GetAllCities: 'GetAllCities',
    AddBulkCity: 'AddBulkCity',
    GetAllCitiesByDistrictId: 'GetAllCitiesByDistrictId?id='
  },
  stateApiEndPoint: {
    GetAllState: 'GetAllState',
    AddBulkState: 'AddBulkState',
  },
  districtApiEndPoint: {
    GetAllDistrict: 'GetAllDistrict',
    AddBulkDistrict: 'AddBulkDistrict',
    GetAllDistrictByStateId: 'GetAllDistrictByStateId?id='
  },
  talukaApiEndPoint: {
    GetAllTaluka: 'GetAllTaluka',
    AddTaluka: 'AddTaluka',
    GetAllTalukaByCityId: 'GetAllTalukaByCityId?id='
  },
  executiveApiEndPoint: {
    GetAllExecutive: 'GetAllExecutive',
    GetDownlineExecutiveByExecutiveId: 'GetDownlineExecutiveByExecutiveId?id=',
    AddUpdateExecutive: 'AddUpdateExecutive',
    DeleteExecutiveByExecutiveId: 'DeleteExecutiveByExecutiveId'
  },
  foodCategoryApiEndPoint: {
    GetAllFoodCategory: 'GetAllFoodCategory',
    AddBulkFoodCategory: 'AddBulkFoodCategory',
    DeleteFoodCategoryByCategoryId: 'DeleteFoodCategoryByCategoryId?categoryId='
  },
  foodItemApiEndPoint: {
    GetAllFoodItems: 'GetAllFoodItems',
    AddFoodItem: 'AddFoodItem',
    GetFoodItemById: 'GetFoodItemById?itemId=',
    GetAllFoodItemsbyCatId: 'GetAllFoodItemsbyCatId?catid=',
    UpdateFoodItem: 'UpdateFoodItem',
    DeleteFoodItmeByItemId: 'DeleteFoodItmeByItemId?itemId=',
    Upload: 'Upload'
  },
  farmerApiEndPoint: {
    GetAllFarmers: 'GetAllFarmers',
    GetFarmersByFilter: 'GetFarmersByFilter',
    GetFarmerById: 'GetFarmerById?id=',
    AddNewFarmer: 'AddNewFarmer',
    UpdateFarmerDetails: 'UpdateFarmerDetails',
    DeleteFarmerByFarmerId: 'DeleteFarmerByFarmerId?farmerId=',
    VerifyFarmer: 'VerifyFarmer'
  },
  customerApiEndPoint: {
    GetAllCustomers: 'GetAllCustomers',
    GetCustomerById: 'GetCustomerById?customerId=',
    AddUpdateCustomer: 'AddUpdateCustomer',
    DeleteCustomerByCustomerId: 'DeleteCustomerByCustomerId?customerId='
  },
  rfqApiEndPoint: {
    CreateNewRfq: 'CreateNewRfq',
    UpdateRfq: 'UpdateRfq',
    DeleteRfqByRFQId: 'DeleteRfqByRFQId?quotationId=',
    GetAllQuotation: 'GetAllQuotation',
    AddBid: 'AddBid',
    UpdateBid: 'UpdateBid',
    DeleteBidByBidId: 'DeleteBidByBidId?bidId=',
    GetAllQuotationBids: 'GetAllQuotationBids',
    GetAllBidsByQuotationId: 'GetAllBidsByQuotationId?quotationId=',
    GetBidsForQuotationById: 'GetBidsForQuotationById?quotationId=',
    GetAllQuotationBidsByVendorId: 'GetAllQuotationBidsByVendorId?vendorId=',
    GetAllQuotationBidsByFarmerId: 'GetAllQuotationBidsByFarmerId?farmerId=',
    getRfqByQuotationId: 'getRfqByQuotationId?quotationId='
  },
  vendorApiEndPoint: {
    AddNewVendor: 'AddNewVendor',
    UpdateVendor: 'UpdateVendor',
    DeleteVendorByVendorId: 'DeleteVendorByVendorId?vendorId=',
    GetVendorById: 'GetVendorById?vendorId=',
    GetVendorsByFilter: 'GetVendorsByFilter',
    VerifyVendor: 'VerifyVendor'
  },
  dashboardApiEndPoint: {
    GetAdminDashboardData: 'GetAdminDasboardData',
    GetVendorDashboardById: 'GetVendorDasboardById?id=',
    GetFarmerDashboardById: 'GetFarmerDasboardById?id='
  }
}
