import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseBtnComponent } from './browse-btn.component';

describe('BrowseBtnComponent', () => {
  let component: BrowseBtnComponent;
  let fixture: ComponentFixture<BrowseBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowseBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
