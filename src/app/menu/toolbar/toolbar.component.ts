import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service';

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

  ngOnInit() { }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

}
