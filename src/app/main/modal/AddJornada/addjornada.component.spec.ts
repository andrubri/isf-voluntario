import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddjornadaComponent } from './addjornada.component';

describe('AddjornadaComponent', () => {
  let component: AddjornadaComponent;
  let fixture: ComponentFixture<AddjornadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddjornadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddjornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
