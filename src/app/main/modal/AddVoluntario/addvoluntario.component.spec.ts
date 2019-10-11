import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvoluntarioComponent } from './addvoluntario.component';

describe('AddvoluntarioComponent', () => {
  let component: AddvoluntarioComponent;
  let fixture: ComponentFixture<AddvoluntarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvoluntarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
