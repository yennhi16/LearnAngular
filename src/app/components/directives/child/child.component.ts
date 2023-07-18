import { Component, Input } from '@angular/core';
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
export class ChildComponent {
  @Input() color: string = '';
}
