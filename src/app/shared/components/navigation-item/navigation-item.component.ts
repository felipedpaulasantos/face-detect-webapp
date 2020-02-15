import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';

import { NavItem } from './navigation-item';
import { SidenavService } from 'src/app/menu/sidenav/sidenav.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationItemComponent implements OnInit {

  constructor(
    private sidenavService: SidenavService,
    private breakpointObserver: BreakpointObserver,
  ) { }

  @ViewChild('childMenu', {static: true}) public childMenu: any;

  @Input('items') public items: NavItem[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnInit() {
  }

}
