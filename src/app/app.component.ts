import { Component } from '@angular/core';
import { SidenavService } from './menu/sidenav/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'face-detect-webapp';

  constructor(
    protected sidenavService: SidenavService
  ) {}

  toggleSidenav() {
    this.sidenavService.toggle();
  }
}
