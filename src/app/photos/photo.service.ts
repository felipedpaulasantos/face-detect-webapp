import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DetectionAttributes, FaceRectangle } from '../face-detect-services/detect/detection-attributes/detection-attributes';
import { CompareResult } from '../face-detect-services/compare/compare-result/compare-result';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photoSrc$ = new BehaviorSubject<string>('');
  private photoElement$ = new BehaviorSubject<HTMLImageElement>(null);
  private photoFile$ = new BehaviorSubject<File>(null);
  private detectionAttributes$ = new BehaviorSubject<DetectionAttributes[]>(null);
  private compareResult$ = new BehaviorSubject<CompareResult>(null);
  private faceRectangles$ = new BehaviorSubject<FaceRectangle[]>(null);
  private showRectangle$ = new BehaviorSubject<boolean>(true);
  private selectedFace$ = new BehaviorSubject<DetectionAttributes>(null);

  getPhotoSrc(): Observable<string> {
    return this.photoSrc$.asObservable();
  }

  setPhotoSrc(src: string): void {
    this.photoSrc$.next(src);
  }

  getPhotoElement(): Observable<HTMLImageElement> {
    return this.photoElement$.asObservable();
  }

  setPhotoElement(element: HTMLImageElement): void {
    this.photoElement$.next(element);
  }

  getPhotoFile(): Observable<File> {
    return this.photoFile$.asObservable();
  }

  setPhotoFile(file: File) {
    this.photoFile$.next(file);
  }

  getDetectionAttributes(): Observable<DetectionAttributes[]> {
    return this.detectionAttributes$.asObservable();
  }

  setDetectionAttributes(attr: DetectionAttributes[]): void {
    this.detectionAttributes$.next(attr);
    this.drawFaceRectangle();
  }

  getFaceRectangles(): Observable<FaceRectangle[]> {
    return this.faceRectangles$.asObservable();
  }

  setFaceRectangles(rectangles: FaceRectangle[]): void {
    this.faceRectangles$.next(rectangles);
  }

  getShowRectangle(): Observable<boolean> {
    return this.showRectangle$.asObservable();
  }

  setShowRectangle(showRectangle: boolean) {
    this.showRectangle$.next(showRectangle);
  }

  getSelectedFace(): Observable<DetectionAttributes> {
    return this.selectedFace$.asObservable();
  }

  setSelectedFace(faceId): void {
    const faces = this.detectionAttributes$.getValue();
    if (faces) {
      const face = faces.find(face => {
        return face.faceId === faceId;
      });
      this.selectedFace$.next(face);
    }
  }

  getCompareResult(): Observable<CompareResult> {
    return this.compareResult$.asObservable();
  }

  setCompareResult(result: CompareResult) {
    this.compareResult$.next(result);
  }

  constructor() { }

  private drawFaceRectangle(): number[] {

    const image = this.photoElement$.getValue();
    const attrArray = this.detectionAttributes$.getValue();
    const faceRectangles = [];

    if (!image || !attrArray) { return; }
    const widthProportion = image.naturalWidth / image.width;
    const heightProportion = image.naturalHeight / image.height;

    attrArray.forEach(attr => {
      const top = attr.faceRectangle.top / heightProportion;
      const left = attr.faceRectangle.left / widthProportion;
      const width = attr.faceRectangle.width / widthProportion;
      const height = attr.faceRectangle.height / heightProportion;

      faceRectangles.push({
        faceId: attr.faceId,
        top,
        left,
        width,
        height
      });
    });

    this.faceRectangles$.next(faceRectangles);
  }

}
