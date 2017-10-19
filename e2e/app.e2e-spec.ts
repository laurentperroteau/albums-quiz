import { browser } from 'protractor';

import { AlbumsQuizPage } from './app.po';

describe('albums-quiz App', () => {
  let page: AlbumsQuizPage;

  beforeEach(() => {
    page = new AlbumsQuizPage();
  });

  it('should display welcome message', done => {
    browser.waitForAngularEnabled(false);
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Albums quiz'))
      .then(done, done.fail);
  });

  it('should login', done => {
    browser.waitForAngularEnabled(false);
    page.clickButton('Login');
    // TODO: ne trouve pas le champ
    page.fillByInputType('email', 'laurentperroteau@gmail.com');
  });
});
