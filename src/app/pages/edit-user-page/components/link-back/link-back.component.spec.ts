import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkBackComponent } from './link-back.component';

describe('LinkBackComponent', () => {
  let component: LinkBackComponent;
  let fixture: ComponentFixture<LinkBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
