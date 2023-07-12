import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParantComponentComponent } from './parant-component.component';

describe('ParantComponentComponent', () => {
  let component: ParantComponentComponent;
  let fixture: ComponentFixture<ParantComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParantComponentComponent]
    });
    fixture = TestBed.createComponent(ParantComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
