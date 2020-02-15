import { Component, OnInit } from '@angular/core';
import { SidenavService } from './sidenav.service';
import { Router, NavigationEnd } from '@angular/router';
import { NavItem } from 'src/app/shared/components/navigation-item/navigation-item';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  menuItems = [
    {
      displayName: 'Home',
      iconName: 'home',
      route: '/home'
    },
    {
      displayName: 'Serviços',
      iconName: 'face',
      children: [
        {
          displayName: 'Detectar',
          children: [
            {
              displayName: 'Teste1',
              route: '/home'
            },
            {
              displayName: 'Teste2',
              route: '/detectar'
            }
          ]
        },
        {
          displayName: 'Comparar',
          route: '/comparar'
        }
      ]
    }
  ];

  constructor(
    protected sidenavService: SidenavService,
    protected router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) this.sidenavService.close();
    });
  }

  ngOnInit() {
  }



}
