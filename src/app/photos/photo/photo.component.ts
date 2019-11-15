import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, useAnimation } from '@angular/animations';
import { simpleFadeAnimation } from '../../shared/animations/simple-fade.animation';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        useAnimation(simpleFadeAnimation, {
          params: {
            opacity: 0,
            time: '0.5s'
          }
        })
      ])
    ])
  ]
})
export class PhotoComponent implements OnInit {

  src = new Observable<string>(null);

  @ViewChild('imagePreview', { static: false }) imagePreview: ElementRef;
  image: HTMLImageElement;

  constructor(
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    this.src = this.photoService.photoSrc$;
   }

  onLoad() {
    this.image = this.imagePreview.nativeElement;
    this.photoService.photoElement$.next(this.image);
  }

}
