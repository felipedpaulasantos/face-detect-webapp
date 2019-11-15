import { style, transition, animate, animation } from '@angular/animations';

export const simpleFadeAnimation = animation([
  style({
    opacity: '{{ opacity }}'
  }),
  animate('{{ time }}')
]);

