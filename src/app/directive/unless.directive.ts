import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective implements OnChanges {
  hasView = false;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    console.log('unless-templateRef', this.templateRef);
  }

  // @Input('appUnlessThen') test: string | undefined;
  @Input('appUnless')
  condition: boolean | undefined;
  @Input('appUnlessThen') placeholder: TemplateRef<any> | null = null;
  private context = { name: 'Nam', age: 12 };
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('appUnlessThen', this.test);
    if (this.condition) {
      if (this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
      if (this.placeholder) {
        this.viewContainer.createEmbeddedView(this.placeholder);
        this.hasView = true;
      }
    } else {
      if (!this.hasView) {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef, this.context);
        this.hasView = true;
      }
    }
  }
}
