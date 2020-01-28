import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {

  constructor(
    protected sidenavService: SidenavService
  ) { }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

}
