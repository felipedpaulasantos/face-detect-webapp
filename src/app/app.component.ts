import { Component, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';

import { AuthenticationService } from './authentication/authentication.service';
import { fadeRouteAnimation } from './shared/animations/simple-fade.animation';
import { SidenavService } from './menu/sidenav/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeRouteAnimation]
})
export class AppComponent {

  bodyHeight: number;

  constructor(
    protected sidenavService: SidenavService,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService
  ){
    this.setBodyHeight();
    this.authService.initSSO();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

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

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
