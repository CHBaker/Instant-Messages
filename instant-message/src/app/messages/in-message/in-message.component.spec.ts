import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InMessageComponent } from './in-message.component';

describe('InMessageComponent', () => {
  let component: InMessageComponent;
  let fixture: ComponentFixture<InMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
