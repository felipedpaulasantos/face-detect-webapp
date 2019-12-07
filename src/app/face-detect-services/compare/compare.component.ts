import { Component, OnInit, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FaceDetectService } from '../face-detect.service';
import { CustomSnackBarService } from 'src/app/shared/components/custom-snack-bar/custom-snack-bar.service';
import { CompareResult } from './compare-result/compare-result';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  constructor(
    private faceDetect: FaceDetectService,
    private snackBar: CustomSnackBarService
  ) { }

  innerHeight: number;
  private resultSource = new BehaviorSubject<CompareResult>(null);
  result$ = this.resultSource.asObservable();

  ngOnInit() {
    this.setTabGroupMaxHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setTabGroupMaxHeight();
  }

  setTabGroupMaxHeight() {
    this.innerHeight = window.innerHeight * 0.85;
  }

  receiveImageFile(file: File) {

    if (!file) {
      this.resultSource.next(null);
      return;
    }

    const formData = new FormData();
    formData.append('arquivoImagem', file);

    this.faceDetect.compare(formData).subscribe(
      (response: CompareResult) => {
        this.resultSource.next(response);
      },
      (response) => {
        this.snackBar.openSnackBar(response.error.error.message, '', 'Warn');
      });
  }

}
