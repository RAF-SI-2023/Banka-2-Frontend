import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-hover-button',
  templateUrl: './hover-button.component.html',
  animations:[
    trigger('openClose',[
        state('open', style({
          height: '200px',
          opacity: 1,
          backroundColor: 'yellow'
        })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backroundColor: 'blue'
      })),
      transition('open => closed',[
        animate('1s 1s ease-out')
      ]),
      transition('closed => open',[
        animate('0.5s ease-in')
      ])
    ])
  ],
  styleUrls: ['./hover-button.component.css']
})
export class HoverButtonComponent {
    isOpen = true;
    toggle(){
      this.isOpen = !this.isOpen;
    }
}
