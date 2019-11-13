import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  photoSrc$ = new BehaviorSubject<string>('');
  photoElement$ = new BehaviorSubject<HTMLImageElement>(null);
  photoFile$ = new BehaviorSubject<File>(null);

  constructor() { }



}
