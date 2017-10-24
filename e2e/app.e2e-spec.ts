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
    page.sleep(2000);
    // TODO: ne trouve pas le champ mais n'attend pas si on utilise directement webdriver et by.css(`input`), si 'body' il ne trouve rien
    // browser.driver.findElement(by.tagName(`body`)).sendKeys('laurentperroteau@gmail.com');
  });
});
