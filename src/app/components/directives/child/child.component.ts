import { Component, Input, OnInit } from '@angular/core';
import { HighlightDirective } from 'src/app/directive/highlight.directive';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  hostDirectives: [
    {
      directive: HighlightDirective,
      inputs: ['appHighlight', 'defaultColor'],
    },
  ],
})
export class ChildComponent implements OnInit {
  @Input() color: string = '';
  constructor() {
    console.log('ChildComponent - constructor');
  }
  ngOnInit(): void {
    console.log('ChildComponent -  ngOnInit');
  }
}
