import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, useAnimation } from '@angular/animations';
import { simpleFadeAnimation } from '../../shared/animations/simple-fade.animation';
import { FaceRectangle, DetectionAttributes } from 'src/app/face-detect-services/detect/detection-attributes/detection-attributes';

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
  selectedFace$ = new Observable<DetectionAttributes>(null);
  faceRectangles$ = new Observable<FaceRectangle[]>(null);
  showRectangle$ = new Observable<boolean>();
  marginLeft = 0;
  marginTop = 0;
  image: HTMLImageElement;

  @ViewChild('imagePreview', { static: false }) imagePreview: ElementRef;
  @Output() selectedFaceId = new EventEmitter<string>();

  constructor(
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    this.src = this.photoService.getPhotoSrc();
    this.faceRectangles$ = this.photoService.getFaceRectangles();
    this.showRectangle$ = this.photoService.getShowRectangle();
    this.selectedFace$ = this.photoService.getSelectedFace();
  }

  onLoad() {
    this.image = this.imagePreview.nativeElement;
    this.marginLeft = Number.parseInt(window.getComputedStyle(this.image).marginLeft, 10);
    this.marginTop = Number.parseInt(window.getComputedStyle(this.image).marginTop, 10);
    this.photoService.setPhotoElement(this.image);
  }

  updateSelectedFaceId(faceId: string) {
    this.selectedFaceId.emit(faceId);
    this.photoService.setSelectedFace(faceId);
  }

}
