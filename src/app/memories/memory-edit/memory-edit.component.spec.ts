import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryEditComponent } from './memory-edit.component';

describe('MemoryEditComponent', () => {
  let component: MemoryEditComponent;
  let fixture: ComponentFixture<MemoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
