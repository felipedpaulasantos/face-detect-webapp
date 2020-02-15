import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, QueryList } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Observable } from 'rxjs';
import { simpleFadeAnimation, simpleFadeTrigger } from '../../shared/animations/simple-fade.animation';
import { FaceRectangle, DetectionAttributes } from 'src/app/face-detect-services/detect/detection-attributes/detection-attributes';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  animations: [simpleFadeTrigger]
})
export class PhotoComponent implements OnInit {

  src = new Observable<string>(null);
  selectedFace$ = new Observable<DetectionAttributes>(null);
  faceRectangles$ = new Observable<FaceRectangle[]>(null);
  showRectangle$ = new Observable<boolean>();
  marginLeft = 0;
  marginTop = 0;
  image: HTMLImageElement;

  @ViewChild('containerPhotoPreview', { read: ElementRef, static: false }) photoPreview: ElementRef;
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

    const containerPaddingLeft = Number.parseInt(window.getComputedStyle(this.photoPreview.nativeElement).paddingLeft, 10);
    const imageMarginLeft = Number.parseInt(window.getComputedStyle(this.image).marginLeft, 10);
    this.marginLeft = imageMarginLeft + containerPaddingLeft;

    const containerPaddingTop = Number.parseInt(window.getComputedStyle(this.photoPreview.nativeElement).paddingTop, 10);
    const imageMarginTop = Number.parseInt(window.getComputedStyle(this.image).marginTop, 10);
    this.marginTop = imageMarginTop + containerPaddingTop;

    this.photoService.setPhotoElement(this.image);
  }

  updateSelectedFaceId(faceId: string) {
    this.selectedFaceId.emit(faceId);
    this.photoService.setSelectedFace(faceId);
  }

}
