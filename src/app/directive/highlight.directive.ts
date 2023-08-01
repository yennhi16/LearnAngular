import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight = '';

  @Input() defaultColor = '';

  @Input() appFontStyle = '';

  constructor(private el: ElementRef) {
    // this.el.nativeElement.style.backgroundColor = 'yellow';
    console.log('HighlightDirective - constructor');
    console.log(el);
  }
  ngOnInit(): void {
    console.log('HighlightDirective - ngOnInit');
  }

  private fontStyle(styles: string) {
    this.el.nativeElement.style.fontStyle = styles;
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight || this.defaultColor || 'yellow');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
    this.fontStyle('normal');
  }
  @HostListener('click') onClick() {
    this.fontStyle(this.appFontStyle || 'italic');
  }
}
