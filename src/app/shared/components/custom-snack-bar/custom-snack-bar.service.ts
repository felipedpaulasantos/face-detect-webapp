import { Injectable } from '@angular/core';

import { CustomSnackBarComponent } from './custom-snack-bar.component';
import { MatSnackBar } from '@angular/material';
import { SnackBarType } from './snack-bar-type';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackBarService {

  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(message: string, action: string, snackTypeParam?: SnackBarType) {

    const snackType =
      snackTypeParam !== undefined ? snackTypeParam : 'Info';

    let panelClass = '';
    switch(snackTypeParam) {
      case 'Success':
        panelClass = 'bg-success';
        break;
      case 'Error':
        panelClass = 'bg-danger';
        break;
      case 'Warn':
        panelClass = 'bg-warning';
        break;
      case 'Info':
        panelClass = '';
        break;
    }

    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass,
      data: { message, snackType }
    });
  }
}
