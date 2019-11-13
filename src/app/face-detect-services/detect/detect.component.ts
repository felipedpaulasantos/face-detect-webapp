import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FaceDetectService } from '../face-detect.service';
import { DetectionAttributes } from './detection-attributes/detection-attributes';
import { PhotoComponent } from 'src/app/photos/photo/photo.component';
import { CustomSnackBarService } from 'src/app/shared/components/custom-snack-bar/custom-snack-bar.service';
import { PhotoService } from 'src/app/photos/photo.service';

@Component({
  templateUrl: './detect.component.html',
  styleUrls: ['./detect.component.scss']
})
export class DetectComponent implements OnInit {

  photoSrc$ = new Observable<string>();
  photoData$ = new Observable<HTMLImageElement>(null);
  photoFile$ = new Observable<File>(null);
  @ViewChild('imageInput', null) imageInput;
  @ViewChild(PhotoComponent, { static: false }) photoComponent: PhotoComponent;

  private detectionAttributesSource = new BehaviorSubject<DetectionAttributes[]>(null);
  attributes$ = this.detectionAttributesSource.asObservable();

  constructor(
    private fb: FormBuilder,
    private photoService: PhotoService
  ) {}

  imageForm = this.fb.group({
    imageFile: [null]
  });

  ngOnInit() {
    this.photoData$ = this.photoService.photoElement$;
    this.photoSrc$ = this.photoService.photoSrc$;
    this.photoFile$ = this.photoService.photoFile$;
  }

}
