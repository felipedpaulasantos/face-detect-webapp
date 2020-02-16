import { Component, OnInit } from '@angular/core';
import { SidenavService } from './sidenav.service';
import { Router, NavigationEnd } from '@angular/router';
import { NavItem } from 'src/app/shared/components/navigation-item/navigation-item';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MenuItems } from './models/menu-items';
import { SidenavViewModes } from './models/sidenav-view-modes';
import { SidenavRole } from './models/sidenav-role';

const HANDSET_MAX_WIDTH = '991.98px';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    protected sidenavService: SidenavService,
    protected router: Router,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.closeOnNavigationEnd();

    this.isHandset$.subscribe(isHandset => {
      if (isHandset) {
        this.isHandset = true;
        sidenavService.viewMode.next(SidenavViewModes.SOBRE);
        sidenavService.role.next(SidenavRole.DIALOG);
      } else {
        this.isHandset = false;
        sidenavService.viewMode.next(SidenavViewModes.LADO);
        sidenavService.role.next(SidenavRole.NAVIGATION);
      }
    })
  }

  viewMode: SidenavViewModes;

  isHandset: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([
    `(max-width: ${HANDSET_MAX_WIDTH})`
  ])
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  /* Em telas menores, fecha o menu ao mudar de rota */
  closeOnNavigationEnd() {
    this.router.events.subscribe(event => {
      if (this.isHandset && event instanceof NavigationEnd) this.sidenavService.close();
    });
  }

  menuItems: MenuItems[] = [
    {
      displayName: 'Início',
      iconName: 'home',
      route: '/home'
    },
    {
      displayName: 'Grupos de Pessoas',
      iconName: 'people',
      route: '/person-group',
      disabled: true
    },
    {
      displayName: 'Pessoas',
      iconName: 'person',
      route: '/person',
      disabled: true
    },
    {
      displayName: 'Serviços',
      iconName: 'track_changes',
      children: [
        {
          displayName: 'Detectar',
          route: '/detectar'
        },
        {
          displayName: 'Comparar',
          route: '/comparar'
        }
      ]
    }
  ];

  ngOnInit() {}
}
