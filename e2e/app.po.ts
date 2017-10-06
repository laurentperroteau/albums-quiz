import { browser, by, element } from 'protractor';
import { SharedPage } from './page-object/shared.po';

export class AlbumsQuizPage extends SharedPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root [e2e="title"]')).getText();
  }
}
