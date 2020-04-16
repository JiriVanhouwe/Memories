import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryAddComponent } from './memory-add.component';

describe('MemoryAddComponent', () => {
  let component: MemoryAddComponent;
  let fixture: ComponentFixture<MemoryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
