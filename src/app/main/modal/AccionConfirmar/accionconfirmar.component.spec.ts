import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionConfirmarComponent } from './accionconfirmar.component';

describe('AccionConfirmarComponent', () => {
  let component: AccionConfirmarComponent;
  let fixture: ComponentFixture<AccionConfirmarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccionConfirmarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
