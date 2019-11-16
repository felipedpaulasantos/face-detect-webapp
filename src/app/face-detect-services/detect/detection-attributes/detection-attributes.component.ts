import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, HostListener } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTabChangeEvent } from '@angular/material';
import { trigger, state, style, transition, useAnimation } from '@angular/animations';
import { Observable } from 'rxjs';

import { DetectionAttributes } from './detection-attributes';
import { simpleFadeAnimation } from '../../../shared/animations/simple-fade.animation';
import { CompareResult } from '../../compare/compare-result/compare-result';
import { PhotoService } from 'src/app/photos/photo.service';

interface AttributesNode {
  name: string;
  value?: string;
  type?: AttributeType;
  children?: AttributesNode[];
}

enum AttributeType {
  NUMBER = 'number',
  PERCENT = 'percent',
  GENDER = 'gender',
  BOOLEAN = 'boolean',
  COLOR = 'color'
}

@Component({
  selector: 'app-detection-attributes',
  templateUrl: './detection-attributes.component.html',
  styleUrls: ['./detection-attributes.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        useAnimation(simpleFadeAnimation, {
          params: {
            opacity: 0,
            time: '0.5s'
          }
        })
      ])
    ])
  ]
})
export class DetectionAttributesComponent implements OnInit, OnChanges {

  @ViewChild('tree', { static: false }) tree;
  @ViewChild('tabGroup', { static: false }) tabGroup;

  @Input() detectionAttributes$: Observable<DetectionAttributes[]> = null;
  @Input() compareResult$: Observable<CompareResult> = null;
  selectedFace$ = new Observable<DetectionAttributes>(null);

  detectionAttributesArray: DetectionAttributes[] = [];
  detectionAttributes: DetectionAttributes = null;

  isTreeExpanded = false;
  treeControl = new NestedTreeControl<AttributesNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<AttributesNode>();

  constructor(
    private photoService: PhotoService
  ) {}

  ngOnInit() {
    this.selectedFace$ = this.photoService.getSelectedFace();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateDetectionAttributes();
  }

  toggleTreeExpanded() {
    this.isTreeExpanded ? this.tree.treeControl.collapseAll() : this.tree.treeControl.expandAll();
    this.isTreeExpanded = !this.isTreeExpanded;
  }

  updateDetectionAttributes(faceId?: any) {

    this.detectionAttributes$
      .subscribe((attr: DetectionAttributes[]) => {
        if (attr && attr.length > 0) {
          this.detectionAttributesArray = attr;
          this.photoService.setDetectionAttributes(attr);
          const selectedFace = (faceId && faceId.value) ? attr.find(face => faceId.value === face.faceId) : attr[0];
          this.detectionAttributes = selectedFace;
          this.photoService.setSelectedFace(this.detectionAttributes.faceId);

          this.isTreeExpanded = false;
          this.buildTreeData(this.detectionAttributes);
        } else {
          this.detectionAttributes = null;
          this.detectionAttributesArray = [];
        }
      });
  }

  hasChild = (_: number, node: AttributesNode) => !!node.children && node.children.length > 0;

  buildTreeData(attr: DetectionAttributes) {

    if (!attr) { return; }

    let facialHair: AttributesNode = null;
    let headPose: AttributesNode = null;
    let emotion: AttributesNode = null;
    let hair: AttributesNode = null;
    let makeup: AttributesNode = null;
    let occlusion: AttributesNode = null;
    let accessories: AttributesNode = null;
    let blur: AttributesNode = null;
    let exposure: AttributesNode = null;
    let noise: AttributesNode = null;

    if (attr.faceAttributes.facialHair) {
      facialHair = {
        name: 'Cabelo Facial',
        children: [
          {name: 'Bigode', value: `${attr.faceAttributes.facialHair.moustache}`, type: AttributeType.PERCENT},
          {name: 'Barba', value: `${attr.faceAttributes.facialHair.beard}`, type: AttributeType.PERCENT},
          {name: 'Costeleta', value: `${attr.faceAttributes.facialHair.sideburns}`, type: AttributeType.PERCENT}
        ]
      };
    }

    if (attr.faceAttributes.emotion) {
      emotion = {
        name: 'Emoções',
        children: [
          {name: 'Alegria', value: `${attr.faceAttributes.emotion.happiness}`, type: AttributeType.PERCENT},
          {name: 'Desprezo', value: `${attr.faceAttributes.emotion.contempt}`, type: AttributeType.PERCENT},
          {name: 'Raiva', value: `${attr.faceAttributes.emotion.anger}`, type: AttributeType.PERCENT},
          {name: 'Nojo', value: `${attr.faceAttributes.emotion.disgust}`, type: AttributeType.PERCENT},
          {name: 'Medo', value: `${attr.faceAttributes.emotion.fear}`, type: AttributeType.PERCENT},
          {name: 'Neutralidade', value: `${attr.faceAttributes.emotion.neutral}`, type: AttributeType.PERCENT},
          {name: 'Tristeza', value: `${attr.faceAttributes.emotion.sadness}`, type: AttributeType.PERCENT},
          {name: 'Surpresa', value: `${attr.faceAttributes.emotion.surprise}`, type: AttributeType.PERCENT}
        ]
      };
    }

    if (attr.faceAttributes.headPose) {
      headPose = {
        name: 'Pose de cabeça',
        children: [
          {name: 'Giro / Eixo Longitudinal', value: `${attr.faceAttributes.headPose.roll}`},
          {name: 'Inclinação / Eixo vertical', value: `${attr.faceAttributes.headPose.pitch}`},
          {name: 'Guinada / Eixo lateral', value: `${attr.faceAttributes.headPose.yaw}`}
        ]
      };
    }

    if (attr.faceAttributes.hair) {

      const hairColors: AttributesNode[] = [];
      if (attr.faceAttributes.hair.hairColor) {
        attr.faceAttributes.hair.hairColor.forEach(colors => {
          hairColors.push(
            {
              name: colors.color,
              value: `${colors.confidence}`,
              type: AttributeType.COLOR
            }
          );
        });
      }

      hair = {
        name: 'Cabelo',
        children: [
          {name: 'Careca', value: `${attr.faceAttributes.hair.bald}`, type: AttributeType.PERCENT},
          {name: 'Invisível', value: `${attr.faceAttributes.hair.invisible}`, type: AttributeType.BOOLEAN},
          {
            name: 'Cor',
            children: hairColors
          }
        ]
      };
    }

    if (attr.faceAttributes.makeup) {
      makeup = {
        name: 'Maquiagem',
        children: [
          {name: 'Maquiagem dos olhos', value: `${attr.faceAttributes.makeup.eyeMakeup}`, type: AttributeType.BOOLEAN},
          {name: 'Maquiagem dos lábios', value: `${attr.faceAttributes.makeup.lipMakeup}`, type: AttributeType.BOOLEAN}
        ]
      };
    }

    if (attr.faceAttributes.accessories) {
      const items: AttributesNode[] = [];
      attr.faceAttributes.accessories.forEach(item => {
        items.push(
          {
            name: item.type,
            value: `${item.confidence}`,
            type: AttributeType.PERCENT
          }
        );
      });
      accessories = {
        name: 'Acessórios',
        children: items
      };
    }

    if (attr.faceAttributes.occlusion) {
      occlusion = {
        name: 'Oclusão',
        children: [
          {name: 'Testa oculta', value: `${attr.faceAttributes.occlusion.foreheadOccluded}`, type: AttributeType.BOOLEAN},
          {name: 'Olhos ocultos', value: `${attr.faceAttributes.occlusion.eyeOccluded}`, type: AttributeType.BOOLEAN},
          {name: 'Boca oculta', value: `${attr.faceAttributes.occlusion.mouthOccluded}`, type: AttributeType.BOOLEAN}
        ]
      };
    }

    if (attr.faceAttributes.blur) {
      blur = {
        name: 'Embaçamento',
        children: [
          {name: 'Grau de embaçamento', value: `${attr.faceAttributes.blur.blurLevel}`},
          {name: 'Valor', value: `${attr.faceAttributes.blur.value}`, type: AttributeType.PERCENT}
        ]
      };
    }

    if (attr.faceAttributes.exposure) {
      exposure = {
        name: 'Exposição',
        children: [
          {name: 'Grau de exposição', value: `${attr.faceAttributes.exposure.exposureLevel}`},
          {name: 'Valor', value: `${attr.faceAttributes.exposure.value}`, type: AttributeType.PERCENT}
        ]
      };
    }

    if (attr.faceAttributes.noise) {
      noise = {
        name: 'Ruído',
        children: [
          {name: 'Grau de ruído', value: `${attr.faceAttributes.noise.noiseLevel}`},
          {name: 'Valor', value: `${attr.faceAttributes.noise.value}`, type: AttributeType.PERCENT}
        ]
      };
    }

    const TREE_DATA: AttributesNode[] = [
      {name: 'Idade', value: `${attr.faceAttributes.age}`, type: AttributeType.NUMBER},
      {name: 'Gênero', value: `${attr.faceAttributes.gender}`, type: AttributeType.GENDER},
      {name: 'Sorriso', value: `${attr.faceAttributes.smile}`, type: AttributeType.PERCENT},
      {name: 'Óculos', value: `${attr.faceAttributes.glasses}`},
      emotion, facialHair, hair, headPose, makeup, accessories, occlusion, blur, exposure, noise
    ];

    this.dataSource.data = TREE_DATA;
    this.treeControl.dataNodes = TREE_DATA;
  }


}
