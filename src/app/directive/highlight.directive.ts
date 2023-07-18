import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input() appHighlight = '';
  @Input() defaultColor = '';

  @Input() appFontStyle = '';

  constructor(private el: ElementRef) {
    // this.el.nativeElement.style.backgroundColor = 'yellow';
  }
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
  private fontStyle(styles: string) {
    this.el.nativeElement.style.fontStyle = styles;
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
