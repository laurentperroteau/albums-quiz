import { browser, element, by } from 'protractor';

import { CommonPage } from './common.po';

export interface Input {
  formcontrolname?: string,
  placeholder    ?: string,
  value: string
}

export class SharedPage extends CommonPage {

  constructor() {
    super();
  }

  fillInputs(inputs: Input[]) {
    inputs.forEach(input => {
      let attributeSelector;

      if (input.formcontrolname) {
        attributeSelector = `input[formcontrolname="${input.formcontrolname}"]`;
      }

      if (input.placeholder) {
        attributeSelector = `input[placeholder="${input.placeholder}"]`;
      }

      const elem = element(
        by.css(attributeSelector)
      );

      elem.clear().then(() => {
        elem.sendKeys(input.value);
      });
    })
  }

  clickRadios(inputs: Input[]) {
    inputs.forEach(input => {

      element(
        by.css(`input[type="radio"][formcontrolname="${input.formcontrolname}"][ng-reflect-value="${input.value}"]`)
      ).click();
    })
  }
}
