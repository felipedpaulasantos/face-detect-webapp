import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, useAnimation } from '@angular/animations';

import { CompareResult } from './compare-result';
import { simpleFadeAnimation, simpleFadeTrigger } from 'src/app/shared/animations/simple-fade.animation';

@Component({
  selector: 'app-compare-result',
  templateUrl: './compare-result.component.html',
  styleUrls: ['./compare-result.component.scss'],
  animations: [simpleFadeTrigger]
})
export class CompareResultComponent implements OnInit {

  constructor() { }

  @Input() compareResult$ = new Observable<CompareResult>(null);
  innerHeight: number;

  ngOnInit() {
    this.setTabGroupMaxHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setTabGroupMaxHeight();
  }

  setTabGroupMaxHeight() {
    this.innerHeight = window.innerHeight * 0.85;
  }

}
