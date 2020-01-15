import { Component, ViewChild, HostListener } from '@angular/core';
import { SidenavService } from './menu/sidenav/sidenav.service';
import { MatToolbar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  bodyHeight: number;

  constructor(
    protected sidenavService: SidenavService
  ){
    this.setBodyHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setBodyHeight();
  }

  setBodyHeight() {
    this.bodyHeight = window.innerHeight - 64;
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }
}
