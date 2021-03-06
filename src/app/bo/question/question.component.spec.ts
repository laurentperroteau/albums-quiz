import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { QuestionService } from '../../core';
import { MatRadioModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BoQuestionComponent } from './question.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumsService } from '../../core/services/album.service';

xdescribe('BoQuestionComponent', () => {
  let component: BoQuestionComponent;
  let fixture: ComponentFixture<BoQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        ReactiveFormsModule,
        MatRadioModule,
      ],
      providers: [
        ActivatedRoute,
        Router,
        QuestionService,
      ],
      declarations: [
        BoQuestionComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
