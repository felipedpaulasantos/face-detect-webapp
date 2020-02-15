import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FaceDetectService {

  constructor(
    private http: HttpClient
  ) { }

  detect(formData: FormData) {
    return this.http.post(
      `${API}/detectar`,
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
      `${API}/comparar`,
      formData
    );
  }

  verifyFaceToFace(faceId1: string, faceId2: string) {
    return this.http.post(
      `${API}/verificar-faces`,
      { faceId1, faceId2 }
    );
  }


}
