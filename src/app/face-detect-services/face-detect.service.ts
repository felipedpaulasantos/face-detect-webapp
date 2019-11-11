import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FaceDetectService {

  constructor(
    private http: HttpClient
  ) { }

  detect(formData: FormData) {
    return this.http.post('/facedetect/v1/detectar?retornaId=true&retornaPontosReferencia=true&retornaModeloReconhecimento=true', formData);
  }
}
