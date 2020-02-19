import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatToolbar } from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {

  appName = environment.appName;

  @ViewChild('toolbar', { static: true })
  toolbar: MatToolbar;
  imgLogoSrc: string;

  constructor(
    protected sidenavService: SidenavService
  ) { }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  ngOnInit() {

  }

  getImageLogoSrc() {
    if (this.toolbar._elementRef.nativeElement.classList.contains('gradient-bg-light')) {
      return '/assets/images/caixa-logo-x.png';
    } else {
      return '/assets/images/caixa-logo-x-branco.png';
    }
  }

}
