import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FaceDetectService } from '../face-detect.service';
import { BehaviorSubject } from 'rxjs';
import { DetectionAttributes } from '../detection-attributes/detection-attributes';
import { PhotoComponent } from 'src/app/photos/photo/photo.component';

@Component({
  templateUrl: './detect.component.html',
  styleUrls: ['./detect.component.scss']
})
export class DetectComponent implements OnInit {

  @Input() photoData: HTMLImageElement;
  @ViewChild('imageInput', null) imageInput;
  @ViewChild(PhotoComponent, { static: false }) photoComponent: PhotoComponent;

  private detectionAttributesSource = new BehaviorSubject<DetectionAttributes[]>(null);
  attributes$ = this.detectionAttributesSource.asObservable();

  selectedFile = '';
  photoSrc = '';
  file: File;

  constructor(
    private fb: FormBuilder,
    private detectService: FaceDetectService
  ) {}

  imageForm = this.fb.group({
    imageFile: [null]
  });

  ngOnInit() {}

  processFile(imageInput: any) {

    this.file = this.imageForm.get('imageFile').value._files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.photoSrc = event.target.result;

      const formData = new FormData();
      formData.append('imageFile', this.file);

      this.detectService.detect(formData).subscribe(
        (res: DetectionAttributes[]) => {
          console.log(res);
          this.detectionAttributesSource.next(res);
        },
        (err) => {
          console.log(err);
        });
    });
    reader.readAsDataURL(this.file);
  }

  receivePhotoData(photoData: HTMLImageElement) {
    this.photoData = photoData;
  }

  clearImage(event: any) {

    this.imageInput.clear(event);
    this.photoSrc = '';
    this.detectionAttributesSource.next(null);
    this.file = null;
    this.photoData = null;
  }

}
