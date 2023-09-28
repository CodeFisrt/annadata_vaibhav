import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRfq } from 'src/app/core/models/interfaces/IUser';
import { MasterService } from 'src/app/core/services/master.service';
import { RfqService } from 'src/app/core/services/rfq.service';

@Component({
  selector: 'app-rfq-list',
  templateUrl: './rfq-list.component.html',
  styleUrls: ['./rfq-list.component.css']
})
export class RfqListComponent implements OnInit {
  quotationArr: any[];
  filteredQuotationArr: any[];
  displayImagePopup: boolean;
  selectedImageUrl: string;

  constructor(private _master: MasterService, private _rfq: RfqService, private router: Router) {
    this.quotationArr = [];
    this.filteredQuotationArr = [];
    this.displayImagePopup = false;
    this.selectedImageUrl = '';
    this._master.toggleFilterIcon(false);
    this._master.search.subscribe((res: any) => {
      const search = res.toLowerCase(); // Convert the search string to lowercase
      this.filteredQuotationArr = this.quotationArr.filter((searchData: any) => {
        const values = Object.values(searchData);
        let flag = false;
        values.forEach((val: any) => {
          if (val !== null && val !== undefined) {
            if (val.toString().toLowerCase().indexOf(search) > -1) {
              flag = true;
              return;
            }
          }
        });
        if (flag) {
          return searchData;
        }
      });
    });
  }

  ngOnInit(): void {
    this.getAllQuotation();
  }

  onOpen(id: number) {
    this.router.navigate(['/create-RFQ', id]);
  }

  getAllQuotation() {
    this._rfq.getAllQuotation().subscribe((res: any) => {
      this.quotationArr = res.data;
      this.filteredQuotationArr = res.data;
    })
  }

  showImagePopup() {
    this.selectedImageUrl = 'assets/images/farmer.jpg';
    this.displayImagePopup = true;
  }

  closeImagePopup() {
    this.displayImagePopup = false;
  }


}
