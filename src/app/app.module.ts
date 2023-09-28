import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CityMasterComponent } from './pages/Master/city-master/city-master.component';
import { ExecutiveComponent } from './pages/Role/executive/executive.component';
import { StatesComponent } from './pages/Master/states/states.component';
import { DistrictComponent } from './pages/Master/district/district.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DialogModule } from 'primeng/dialog';
import { TalukaComponent } from './pages/Master/taluka/taluka.component';
import { FoodCategoryComponent } from './pages/food-category/food-category.component';
import { FoodItemComponent } from './pages/food-item/food-item.component';
import { CustomerUserComponent } from './pages/Users/customer-user/customer-user.component';
import { FarmerUserComponent } from './pages/Users/farmer-user/farmer-user.component';
import { VendorUserComponent } from './pages/Users/vendor-user/vendor-user.component';
import { FarmerFilterComponent } from './pages/farmer-filter/farmer-filter.component';
import { AddCustomerComponent } from './pages/add-customer/add-customer.component';
import { AddNewFarmerComponent } from './pages/add-new-farmer/add-new-farmer.component';
import { CreateRfqComponent } from './pages/create-rfq/create-rfq.component';
import { RfqListComponent } from './pages/rfq-list/rfq-list.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { LoaderComponent } from './pages/loader/loader.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { AddVendorComponent } from './pages/add-vendor/add-vendor.component';
import { AllVendorComponent } from './pages/all-vendor/all-vendor.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { NaPipe } from './shared/pipes/na.pipe';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { HomeComponent } from './pages/website/home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    CityMasterComponent,
    ExecutiveComponent,
    StatesComponent,
    DistrictComponent,
    TalukaComponent,
    FoodCategoryComponent,
    FoodItemComponent,
    CustomerUserComponent,
    FarmerUserComponent,
    VendorUserComponent,
    FarmerFilterComponent,
    AddCustomerComponent,
    AddNewFarmerComponent,
    CreateRfqComponent,
    RfqListComponent,
    LoaderComponent,
    AddVendorComponent,
    AllVendorComponent,
    NaPipe,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CascadeSelectModule,
    DialogModule,
    CheckboxModule,
    InputSwitchModule,
    InputTextareaModule,
    ToastModule,
    CalendarModule,
    DropdownModule,
    FileUploadModule,
    ConfirmDialogModule,
    ProgressBarModule,
    ConfirmPopupModule,
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
