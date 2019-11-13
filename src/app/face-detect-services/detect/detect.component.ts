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

  photoData$ = new Observable<HTMLImageElement>(null);
  @ViewChild('imageInput', null) imageInput;
  @ViewChild(PhotoComponent, { static: false }) photoComponent: PhotoComponent;

  private detectionAttributesSource = new BehaviorSubject<DetectionAttributes[]>(null);
  attributes$ = this.detectionAttributesSource.asObservable();

  photoSrc = '';
  file: File;

  constructor(
    private fb: FormBuilder,
    private detectService: FaceDetectService,
    private snackBar: CustomSnackBarService,
    private photoService: PhotoService
  ) {}

  imageForm = this.fb.group({
    imageFile: [null]
  });

  ngOnInit() {
    this.photoData$ = this.photoService.imageElement$;
  }

  processFile(imageInput: any) {

    this.file = this.imageForm.get('imageFile').value._files[0];
    if (!this.file) {
      this.snackBar.openSnackBar('Arquivo inválido!', '', 'Error');
    }

    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      this.photoSrc = event.target.result;
      this.photoService.photoSrc$.next(this.photoSrc);

      const formData = new FormData();
      formData.append('imageFile', this.file);

      this.detectService.detect(formData).subscribe(
        (res: DetectionAttributes[]) => {
          if (Number(res.length) === 0) {
            this.snackBar.openSnackBar('Nenhuma face detectada.', '', 'Warn');
            return;
          }
          this.detectionAttributesSource.next(res);
        },
        (err) => {
          this.snackBar.openSnackBar('Houve um erro ao consultar a API!', '', 'Error');
        });
    });
    reader.readAsDataURL(this.file);
  }

  clearImage(event: any) {

    this.photoService.photoSrc$.next('');
    this.photoService.imageElement$.next(null);
    this.detectionAttributesSource.next(null);
    this.file = null;
  }

}
