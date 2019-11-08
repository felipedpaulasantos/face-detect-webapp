import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './detect.component.html',
  styleUrls: ['./detect.component.scss']
})
export class DetectComponent implements OnInit {

  @ViewChild('imageInput', null) imageInput;
  selectedFile = '';
  photoSrc = '';

  constructor(
    private fb: FormBuilder
  ) {}

  imageForm = this.fb.group({
    imageFile: [null]
  });

  ngOnInit() {}

  processFile(imageInput: any) {

    // const file: File = imageInput.files[0];
    const file: File = this.imageForm.get('imageFile').value._files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.photoSrc = event.target.result;

/*       this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {

        },
        (err) => {

        }); */
    });
    reader.readAsDataURL(file);

    console.log(this.selectedFile);
  }

  clearImage(event: any) {

    this.imageInput.clear(event);
    this.photoSrc = '';
  }

}
