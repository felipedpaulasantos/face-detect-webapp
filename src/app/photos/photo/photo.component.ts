import { Component, OnInit, Input, ViewChild, ElementRef, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  @Input() src = '';
  @ViewChild('imagePreview', { static: false }) imagePreview: ElementRef;
  @Output() photoDataEvent = new EventEmitter<HTMLImageElement>();
  image: HTMLImageElement;

  constructor() { }

  ngOnInit() { }

  onLoad() {
    this.image = this.imagePreview.nativeElement;
    this.photoDataEvent.emit(this.image);
  }

}
