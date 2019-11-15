import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { FaceDetectService } from '../face-detect.service';
import { DetectionAttributes } from './detection-attributes/detection-attributes';
import { PhotoComponent } from 'src/app/photos/photo/photo.component';
import { CustomSnackBarService } from 'src/app/shared/components/custom-snack-bar/custom-snack-bar.service';
import { PhotoService } from 'src/app/photos/photo.service';
import { CompareResult } from '../compare/compare-result/compare-result';

@Component({
  templateUrl: './detect.component.html',
  styleUrls: ['./detect.component.scss']
})
export class DetectComponent implements OnInit {

  innerHeight: number;
  photoSrc$ = new Observable<string>();
  photoData$ = new Observable<HTMLImageElement>(null);
  photoFile$ = new Observable<File>(null);

  @ViewChild('imageInput', null) imageInput;
  @ViewChild(PhotoComponent, { static: false }) photoComponent: PhotoComponent;

  private detectionAttributesSource = new BehaviorSubject<DetectionAttributes[]>(null);
  attributes$ = this.detectionAttributesSource.asObservable();

  private resultSource = new BehaviorSubject<CompareResult>(null);
  result$ = this.resultSource.asObservable();

  constructor(
    private fb: FormBuilder,
    private photoService: PhotoService,
    private detectService: FaceDetectService,
    private snackBar: CustomSnackBarService
  ) {}

  imageForm = this.fb.group({
    imageFile: [null]
  });

  ngOnInit() {
    this.photoData$ = this.photoService.photoElement$;
    this.photoSrc$ = this.photoService.photoSrc$;
    this.photoFile$ = this.photoService.photoFile$;
    this.setTabGroupMaxHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setTabGroupMaxHeight();
  }

  setTabGroupMaxHeight() {
    this.innerHeight = window.innerHeight * 0.90;
  }

  receiveImageFile(file: File) {

    if (!file) {
      this.detectionAttributesSource.next(null);
      return;
    }

    const formData = new FormData();
    formData.append('imageFile', file);

    this.detectService.detect(formData).subscribe(
      (detectionAttr: DetectionAttributes[]) => {

        if (Number(detectionAttr.length) === 0) {
          this.snackBar.openSnackBar('Nenhuma face detectada.', '', 'Warn');
          return;
        }

        if (Number(detectionAttr.length) === 2) {
          this.detectService.verifyFaceToFace(detectionAttr[0].faceId, detectionAttr[1].faceId).subscribe(
            (compareResult: CompareResult) => {
              this.resultSource.next(compareResult);
              this.detectionAttributesSource.next(detectionAttr);
              this.snackBar.openSnackBar('Atributos atualizados', '', 'Success');
            },
            (errorResponse) => {
              this.snackBar.openSnackBar(errorResponse.error.error.message, '', 'Warn');
            });
        } else {
          this.detectionAttributesSource.next(detectionAttr);
          this.snackBar.openSnackBar('Atributos atualizados', '', 'Success');
        }
      },
      (err) => {
        this.snackBar.openSnackBar('Houve um erro ao consultar a API!', '', 'Error');
      });
  }

}
