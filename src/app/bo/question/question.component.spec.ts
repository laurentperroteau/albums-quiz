import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { QuestionService } from '../services/question.service';
import { MdRadioModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        ReactiveFormsModule,
        MdRadioModule
      ],
      providers: [
        FormBuilder,
        QuestionService
      ],
      declarations: [
        QuestionComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
