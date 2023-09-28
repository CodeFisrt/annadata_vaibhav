import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private _master: MasterService) {
    this._master.showLoader.subscribe((res: any) => {
      if (res === true) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    })
  }

  ngOnInit(): void {
  }

}
