import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDataComponent } from './card.data.component';

describe('CardPreviewComponent', () => {
  let component: CardDataComponent;
  let fixture: ComponentFixture<CardDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
