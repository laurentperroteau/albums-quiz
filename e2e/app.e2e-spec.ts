import { AlbumsQuizPage } from './app.po';

describe('albums-quiz App', () => {
  let page: AlbumsQuizPage;

  beforeEach(() => {
    page = new AlbumsQuizPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Albums quiz'))
      .then(done, done.fail);
  });
});
