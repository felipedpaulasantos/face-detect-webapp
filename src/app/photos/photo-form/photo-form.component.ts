import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { CustomSnackBarService } from 'src/app/shared/components/custom-snack-bar/custom-snack-bar.service';
import { PhotoService } from '../photo.service';
import { FaceRectangle } from 'src/app/face-detect-services/detect/detection-attributes/detection-attributes';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss']
})
export class PhotoFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private snackBar: CustomSnackBarService,
    private photoService: PhotoService
  ) {}

  photoSrc: string = null;
  photoElement$ = new Observable<HTMLImageElement>(null);
  photoElement: HTMLImageElement = null;
  photoFile: File = null;

  faceRectangles$ = new Observable<FaceRectangle[]>(null);

  @Output() sendImageFile: EventEmitter<File> = new EventEmitter();

  imageForm = this.fb.group({
    arquivoImagem: [null],
    showRectangle: [true]
  });

  ngOnInit() {
    this.photoElement$ = this.photoService.getPhotoElement();
    this.faceRectangles$ = this.photoService.getFaceRectangles();
  }

  processFile(imageInput: any) {

    if (!imageInput || !imageInput.target || !imageInput.target.files[0]) {
      this.snackBar.openSnackBar('Arquivo inexistente ou inválido', '', 'Warn');
      return;
    }

    this.photoFile = imageInput.target.files[0];
    this.photoService.setPhotoFile(this.photoFile);

    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.photoSrc = event.target.result;
      this.photoService.setPhotoSrc(this.photoSrc);
    });
    reader.readAsDataURL(this.photoFile);
    this.sendImageFile.emit(this.photoFile);
  }

  toggleRectangleVisibility(event: any) {
    this.photoService.setShowRectangle(event.checked);
  }

  clearImage(event: any) {

    this.imageForm.get('arquivoImagem').setValue(null);
    this.photoService.reset();
    this.photoFile = null;
    this.sendImageFile.emit(null);
  }

}
