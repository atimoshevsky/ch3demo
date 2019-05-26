import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CicalertComponent } from './cicalert.component';

describe('CicalertComponent', () => {
  let component: CicalertComponent;
  let fixture: ComponentFixture<CicalertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CicalertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CicalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
