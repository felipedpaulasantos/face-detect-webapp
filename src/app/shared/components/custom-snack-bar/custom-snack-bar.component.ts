import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { SnackBarType } from './snack-bar-type';

@Component({
  selector: 'app-custom-snack-bar',
  templateUrl: './custom-snack-bar.component.html',
  styleUrls: ['./custom-snack-bar.component.scss']
})
export class CustomSnackBarComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  ngOnInit() {}

  get getIcon() {

    switch (this.data.snackType as SnackBarType) {
      case 'Success':
        return 'done';
      case 'Error':
        return 'cancel';
      case 'Warn':
        return 'warning';
      case 'Info':
        return 'info';
    }
  }

}
