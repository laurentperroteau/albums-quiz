import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bo-question-form',
  template: `
    <form [formGroup]="form">
      <input formControlName="id"/>
      <input formControlName="label"/>
      <md-radio-group formControlName="radioResponse">
        <div formArrayName="radios">
          <md-radio-button *ngFor="let radio of radios.controls;" [value]="radio.value">
            {{ radio.value.label }}
          </md-radio-button>
        </div>
      </md-radio-group>
      <button (click)="submit()">Submit</button>
    </form>
  `,
})
export class QuestionFormComponent {
  @Input() form: FormGroup;
  @Output() onSubmit = new EventEmitter();

  get radios(): FormArray { return this.form.get('radios') as FormArray; }

  submit() {
    this.onSubmit.emit();
  }
}
