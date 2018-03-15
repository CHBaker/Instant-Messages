import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutMessageComponent } from './out-message.component';

describe('OutMessageComponent', () => {
  let component: OutMessageComponent;
  let fixture: ComponentFixture<OutMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
