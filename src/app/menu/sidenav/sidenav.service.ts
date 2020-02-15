import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }

  private opened = new BehaviorSubject<boolean>(false);

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
