import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';

import { NavItem } from './navigation-item';

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationItemComponent implements OnInit {

  constructor() { }

  @ViewChild('childMenu', {static: true}) public childMenu: any;

  @Input('items') public items: NavItem[];

  ngOnInit() {
  }

}
