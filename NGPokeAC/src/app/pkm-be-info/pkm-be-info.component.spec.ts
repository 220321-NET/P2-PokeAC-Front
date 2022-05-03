import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PKMBEINFOComponent } from './pkm-be-info.component';

describe('PKMBEINFOComponent', () => {
  let component: PKMBEINFOComponent;
  let fixture: ComponentFixture<PKMBEINFOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PKMBEINFOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PKMBEINFOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
