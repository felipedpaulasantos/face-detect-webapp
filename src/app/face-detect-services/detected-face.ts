import { FaceAttributes, FaceRectangle, FaceLandmarks } from './detection-attributes/detection-attributes';

export interface DetectedFace {

	id: string;
	createDate: Date;
	recognitionModel?: string;
	faceAttributes?: FaceAttributes;
	faceRectangle?: FaceRectangle;
	faceLandmarks?: FaceLandmarks;
	url?: string;
}
