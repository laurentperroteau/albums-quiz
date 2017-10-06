import { HelperE2E } from '../helper-e2e';

import { browser, element, by } from 'protractor';

// Common to all aplication
export class CommonPage {
  baseUrl = 'http://localhost:4400/';

  constructor() {
    browser.driver.manage().window().maximize();
  }

  navigateTo(path = '') {
    return browser.get('/' + path);
  }

  sleep() {
    return browser.sleep(2000);
  }

  debug() {
    browser.pause(); // c + ENTER to move forward
  }

  getCurrentPath() {
    return browser.getCurrentUrl().then(url => {
      return url.replace(this.baseUrl, '');
    });
  }

  getTextByTag(tag: string = 'h1') {
    return element(by.css('app-root ' + tag)).getText();
  }

  submitForm() {
    element(
      by.css('button[type=submit]')
    ).click();
  }

  clickElementBySelector(selector: string) {
    return element(
      by.css(selector)
    ).click();
  }

  clickLink(text: string) {
    element(
      by.cssContainingText('a', text)
    ).click();
  }

  clickButton(text: string) {
    element(
      by.cssContainingText('button', text)
    ).click();
  }

  saveSessionData(key: string, value: any) {
    return this._getSessionDataObject().then(data => {
      data[key] = value;

      return HelperE2E.writeFilePromise(JSON.stringify(data));
    });
  }

  getSessionData(key: string): PromiseLike<any> {
    return this._getSessionDataObject().then(data => {
      return data[key] || '';
    });
  }

  private _getSessionDataObject(): PromiseLike<any> {
    return HelperE2E.readFilePromise()
      .then((value: any) => {
        return JSON.parse(value) || {};
      })
      .catch(() => {
        return {};
      });
  }

  setLocalStorage(data): PromiseLike<any> {
    return browser.executeScript(`
      window.localStorage.setItem('e2e', '${JSON.stringify(data)}')
    `);
  }

  getLocalStorage(): PromiseLike<any> {
    return browser.executeScript(`
      return window.localStorage.getItem('e2e')
    `).then((value: any) => {
      return JSON.parse(value) || {};
    });
  }
}
