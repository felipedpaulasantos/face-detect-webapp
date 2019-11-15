import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetectedFace } from './detected-face';

@Injectable({
  providedIn: 'root'
})
export class FaceDetectService {

  constructor(
    private http: HttpClient
  ) { }

  detect(formData: FormData) {
    return this.http.post(
      '/facedetect/v1/detectar',
      formData,
      {
        params: {
          retornaId: 'true',
          retornaPontosReferencia: 'true',
          retornaModeloReconhecimento: 'false'
        }
      }
    );
  }

  compare(formData: FormData) {
    return this.http.post(
      '/facedetect/v1/comparar',
      formData
    );
  }

  verifyFaceToFace(faceId1: string, faceId2: string) {
    return this.http.post(
      'facedetect/v1/verificar-faces',
      { faceId1, faceId2 }
    );
  }


}
