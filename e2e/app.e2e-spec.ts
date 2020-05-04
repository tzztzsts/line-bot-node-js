import { LineBotPage } from './app.po';

describe('line-bot App', function() {
  let page: LineBotPage;

  beforeEach(() => {
    page = new LineBotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
