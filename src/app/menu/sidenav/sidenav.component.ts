import { Component, OnInit } from '@angular/core';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    protected sidenavService: SidenavService
  ) { }

  isOpened = true;

  ngOnInit() {
    this.isOpened = this.sidenavService.isOpened();
  }

}
