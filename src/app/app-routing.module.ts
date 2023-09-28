import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CityMasterComponent } from './pages/Master/city-master/city-master.component';
import { ExecutiveComponent } from './pages/Role/executive/executive.component';
import { StatesComponent } from './pages/Master/states/states.component';
import { DistrictComponent } from './pages/Master/district/district.component';
import { TalukaComponent } from './pages/Master/taluka/taluka.component';
import { AddCustomerComponent } from './pages/add-customer/add-customer.component';
import { AddNewFarmerComponent } from './pages/add-new-farmer/add-new-farmer.component';
import { CreateRfqComponent } from './pages/create-rfq/create-rfq.component';
import { FarmerFilterComponent } from './pages/farmer-filter/farmer-filter.component';
import { FoodCategoryComponent } from './pages/food-category/food-category.component';
import { FoodItemComponent } from './pages/food-item/food-item.component';
import { RfqListComponent } from './pages/rfq-list/rfq-list.component';
import { CustomerUserComponent } from './pages/Users/customer-user/customer-user.component';
import { FarmerUserComponent } from './pages/Users/farmer-user/farmer-user.component';
import { VendorUserComponent } from './pages/Users/vendor-user/vendor-user.component';
import { AddVendorComponent } from './pages/add-vendor/add-vendor.component';
import { AllVendorComponent } from './pages/all-vendor/all-vendor.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/Auth/auth.guard';
import { HomeComponent } from './pages/website/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'Home',
    component: HomeComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'city',
        component: CityMasterComponent
      },
      {
        path: 'executive',
        component: ExecutiveComponent
      },
      {
        path: 'states',
        component: StatesComponent
      },
      {
        path: 'district',
        component: DistrictComponent
      },
      {
        path: 'taluka',
        component: TalukaComponent
      },
      {
        path: 'add-customer',
        component: AddCustomerComponent
      },
      {
        path: 'add-vendors',
        component: AddVendorComponent
      },
      {
        path: 'add-vendors/:vendorId',
        component: AddVendorComponent
      },
      {
        path: 'all-vendors',
        component: AllVendorComponent
      },
      {
        path: 'add-new-farmer',
        component: AddNewFarmerComponent
      },
      {
        path: 'add-new-farmer/:farmerId',
        component: AddNewFarmerComponent
      },
      {
        path: 'create-RFQ',
        component: CreateRfqComponent
      },
      {
        path: 'create-RFQ/:quotationId',
        component: CreateRfqComponent
      },
      {
        path: 'filter-farmer',
        component: FarmerFilterComponent
      },
      {
        path: 'food-category',
        component: FoodCategoryComponent
      },
      {
        path: 'food-item',
        component: FoodItemComponent
      },
      {
        path: 'RFQ-list',
        component: RfqListComponent
      },
      {
        path: 'customer-user',
        component: CustomerUserComponent
      },
      {
        path: 'farmer-user',
        component: FarmerUserComponent
      },
      {
        path: 'vendor-user',
        component: VendorUserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
