import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }

  private opened = new BehaviorSubject<boolean>(false);

  toggle() {
    this.opened.next(!this.opened.value);
  }

  isOpened() {
    return this.opened.asObservable();
  }

}
