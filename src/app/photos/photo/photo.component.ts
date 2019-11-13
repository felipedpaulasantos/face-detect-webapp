import { Component, OnInit, ViewChild, ElementRef, Output, OnChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  src = new Observable<string>();

  @ViewChild('imagePreview', { static: false }) imagePreview: ElementRef;
  image: HTMLImageElement;

  constructor(
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    this.src = this.photoService.photoSrc$;
   }

  onLoad() {
    this.image = this.imagePreview.nativeElement;
    this.photoService.imageElement$.next(this.image);
  }

}
