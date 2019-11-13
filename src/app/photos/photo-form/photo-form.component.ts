import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FaceDetectService } from 'src/app/face-detect-services/face-detect.service';
import { CustomSnackBarService } from 'src/app/shared/components/custom-snack-bar/custom-snack-bar.service';
import { PhotoService } from '../photo.service';
import { DetectionAttributes } from 'src/app/face-detect-services/detect/detection-attributes/detection-attributes';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss']
})
export class PhotoFormComponent implements OnInit, OnChanges {

  constructor(
    private fb: FormBuilder,
    private detectService: FaceDetectService,
    private snackBar: CustomSnackBarService,
    private photoService: PhotoService
  ) {}

  photoSrc: string = null;
  photoElement: HTMLImageElement = null;
  photoFile: File = null;

  imageForm = this.fb.group({
    imageFile: [null]
  });

  ngOnInit() {
  }

  ngOnChanges() {

    console.log(this.photoFile);
    console.log(this.photoElement);
  }

  processFile(imageInput: any) {

    this.photoFile = this.imageForm.get('imageFile').value._files[0];
    if (!this.photoFile) {
      this.snackBar.openSnackBar('Arquivo inválido!', '', 'Error');
      return;
    }
    this.photoService.photoFile$.next(this.photoFile);

    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      this.photoSrc = event.target.result;
      this.photoService.photoSrc$.next(this.photoSrc);

      const formData = new FormData();
      formData.append('imageFile', this.photoFile);

      this.detectService.detect(formData).subscribe(
        (res: DetectionAttributes[]) => {
          if (Number(res.length) === 0) {
            this.snackBar.openSnackBar('Nenhuma face detectada.', '', 'Warn');
            return;
          }
          // this.detectionAttributesSource.next(res);
        },
        (err) => {
          this.snackBar.openSnackBar('Houve um erro ao consultar a API!', '', 'Error');
        });
    });
    reader.readAsDataURL(this.photoFile);
  }

  clearImage(event: any) {

    this.photoService.photoSrc$.next('');
    this.photoService.photoElement$.next(null);
    // this.detectionAttributesSource.next(null);
    this.photoFile = null;
  }

}
