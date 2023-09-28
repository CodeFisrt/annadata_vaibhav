import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { loginObject } from 'src/app/core/models/classes/class';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginObj: loginObject;
  isApiCallInProgress: boolean = false;
  showPassword: boolean;
  rememberMe: boolean;

  constructor(private __login: LoginService, private router: Router, private toastr: ToastrService) {
    this.loginObj = new loginObject();
    this.isApiCallInProgress = false;
    this.showPassword = false;
    this.rememberMe = false;
  }

  ngOnInit(): void {
    const rememberLoginInfo = sessionStorage.getItem('rememberLogin');
    if (rememberLoginInfo != null) {
      this.loginObj = JSON.parse(rememberLoginInfo);
      this.rememberMe = true;
    }
  }

  onEyeClick() {
    this.showPassword = !this.showPassword;
  }

  onLogin(loginForm: NgForm) {
    if (loginForm.valid) {
      if (!this.isApiCallInProgress) {
        this.isApiCallInProgress = true;
        this.__login.login(this.loginObj).subscribe((res: any) => {
          if (res.result) {
            this.isApiCallInProgress = false;
            localStorage.setItem('localUserData', JSON.stringify(res.data));
            if (res.data.role == 'Admin' || res.data.role == 'admin') {
              this.router.navigateByUrl('dashboard');
              this.toastr.success(res.message);
            } else if (res.data.role == 'customer' || res.data.role == 'Customer') {
              this.router.navigateByUrl('dashboard');
              this.toastr.success(res.message);
            } else if (res.data.role == 'farmer' || res.data.role == 'Farmer') {
              this.router.navigateByUrl('dashboard');
              this.toastr.success(res.message);
            } else if (res.data.role == 'vendor' || res.data.role == 'Vendor') {
              this.router.navigateByUrl('dashboard')
              this.toastr.success(res.message);
            }

            if (this.rememberMe == true) {
              sessionStorage.setItem('rememberLogin', JSON.stringify(this.loginObj));
            } else {
              sessionStorage.removeItem('rememberLogin');
            }

          } else {
            this.isApiCallInProgress = false;
            this.toastr.error(res.message);
          }
        }, (err: any) => {
          this.isApiCallInProgress = false;
          this.toastr.error(err.message);
        });
      }
    } else {
      Object.values(loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

}
