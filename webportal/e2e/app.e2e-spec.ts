import { SunbirdWebportalPage } from './app.po';

describe('sunbird-webportal App', () => {
  let page: SunbirdWebportalPage;

  beforeEach(() => {
    page = new SunbirdWebportalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
