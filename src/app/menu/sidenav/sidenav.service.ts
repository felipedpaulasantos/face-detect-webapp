import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SidenavRole } from './models/sidenav-role';
import { SidenavViewModes } from './models/sidenav-view-modes';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }

  private opened = new BehaviorSubject<boolean>(true);
  viewMode = new BehaviorSubject<SidenavViewModes>(SidenavViewModes.LADO);
  role = new BehaviorSubject<SidenavRole>(SidenavRole.NAVIGATION);

  isOpened() {
    return this.opened.asObservable();
  }

  toggle() {
    this.opened.next(!this.opened.value);
  }

  close() {
    this.opened.next(false);
  }

  open() {
    this.opened.next(true);
  }

}
