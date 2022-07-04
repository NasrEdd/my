import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlchoixComponent } from './plchoix.component';

describe('PlchoixComponent', () => {
  let component: PlchoixComponent;
  let fixture: ComponentFixture<PlchoixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlchoixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlchoixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
