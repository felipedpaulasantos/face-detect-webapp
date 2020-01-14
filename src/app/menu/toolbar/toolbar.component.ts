import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {

  constructor(
    protected sidenavService: SidenavService
  ) { }

  isSidenavOpened = new Observable<boolean>();

  ngOnInit() {
    this.isSidenavOpened = this.sidenavService.isOpened();
   }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  isSidenavOpen() {
    return this.sidenavService.isOpened();
  }

}
