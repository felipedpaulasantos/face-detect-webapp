import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FaceDetectService } from '../face-detect.service';
import { BehaviorSubject } from 'rxjs';
import { DetectionAttributes } from '../detection-attributes/detection-attributes';

@Component({
  templateUrl: './detect.component.html',
  styleUrls: ['./detect.component.scss']
})
export class DetectComponent implements OnInit {

  @ViewChild('imageInput', null) imageInput;
  private detectionAttributesSource = new BehaviorSubject<DetectionAttributes[]>(null);
  attributes = this.detectionAttributesSource.asObservable();
  selectedFile = '';
  photoSrc = '';

  constructor(
    private fb: FormBuilder,
    private detectService: FaceDetectService
  ) {}

  imageForm = this.fb.group({
    imageFile: [null]
  });

  ngOnInit() {}

  processFile(imageInput: any) {

    const file: File = this.imageForm.get('imageFile').value._files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.photoSrc = event.target.result;

      const formData = new FormData();
      formData.append('imageFile', file);
      this.detectService.detect(formData).subscribe(
        (res: DetectionAttributes[]) => {
          console.log(res);
          this.detectionAttributesSource.next(res);
        },
        (err) => {
          console.log(err);
        });
    });
    reader.readAsDataURL(file);
  }

  clearImage(event: any) {

    this.imageInput.clear(event);
    this.photoSrc = '';
    this.detectionAttributesSource.next(null);
  }

}
