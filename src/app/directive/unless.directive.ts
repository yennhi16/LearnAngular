import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective implements OnChanges {
  private hasView = false;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
  @Input('appUnlessElse') placeholder: TemplateRef<any> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.placeholder && changes['appUnless'].currentValue) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.placeholder);
    } else {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
