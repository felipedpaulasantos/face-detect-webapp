import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  photoSrc$ = new BehaviorSubject<string>('');
  imageElement$ = new BehaviorSubject<HTMLImageElement>(null);
  imageFile$ = new BehaviorSubject<File>(null);

  constructor() { }



}
