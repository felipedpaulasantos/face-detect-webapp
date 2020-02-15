import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

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
  heightProportion = 0.85;
  photoSrc$ = new Observable<string>();
  photoElement$ = new Observable<HTMLImageElement>(null);
  photoFile$ = new Observable<File>(null);

  @Input() selectedFaceId: string;
  @ViewChild('imageInput', null) imageInput;
  @ViewChild(PhotoComponent, { static: false }) photoComponent: PhotoComponent;

  private attributesSource$ = new BehaviorSubject<DetectionAttributes[]>(null);
  attributes$ = this.attributesSource$.asObservable();

  private resultSource$ = new BehaviorSubject<CompareResult>(null);
  result$ = this.resultSource$.asObservable();

  constructor(
    private fb: FormBuilder,
    private photoService: PhotoService,
    private detectService: FaceDetectService,
    private snackBar: CustomSnackBarService
  ) {}

  imageForm = this.fb.group({
    arquivoImagem: [null]
  });

  ngOnInit() {
    this.photoElement$ = this.photoService.getPhotoElement();
    this.photoSrc$ = this.photoService.getPhotoSrc();
    this.photoFile$ = this.photoService.getPhotoFile();
    this.result$ = this.photoService.getCompareResult();
    this.setTabGroupMaxHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setTabGroupMaxHeight();
  }

  setTabGroupMaxHeight() {
    this.innerHeight = window.innerHeight * this.heightProportion;
  }

  updateSelectedFaceId(faceId: any) {
    this.selectedFaceId = faceId;
  }

  receiveImageFile(file: File) {

    if (!file) {
      this.attributesSource$.next(null);
      this.photoService.setDetectionAttributes(null);
      return;
    }

    const formData = new FormData();
    formData.append('arquivoImagem', file);

    this.detectService.detect(formData).subscribe(
      (detectionAttr: DetectionAttributes[]) => {

        if (Number(detectionAttr.length) === 0) {
          this.snackBar.openSnackBar('Nenhuma face detectada.', '', 'Warn');
          return;
        }

        if (Number(detectionAttr.length) === 2) {
          this.detectService.verifyFaceToFace(detectionAttr[0].faceId, detectionAttr[1].faceId).subscribe(
            (compareResult: CompareResult) => {
              this.photoService.setDetectionAttributes(detectionAttr);
              this.photoService.setCompareResult(compareResult);
              this.attributesSource$.next(detectionAttr);
              this.snackBar.openSnackBar('Atributos atualizados', '', 'Success');
            },
            (errorResponse) => {
              this.snackBar.openSnackBar(errorResponse.message, '', 'Warn');
            });
        } else {
          this.photoService.setDetectionAttributes(detectionAttr);
          this.attributesSource$.next(detectionAttr);
          this.snackBar.openSnackBar('Atributos atualizados', '', 'Success');
        }
      },
      (err) => {
        console.error(err);
        this.snackBar.openSnackBar(`${err.message}`, '', 'Error');
      });
  }

}
