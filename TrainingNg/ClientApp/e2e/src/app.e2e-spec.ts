import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';


describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getMainHeading()).toEqual('Add a Training');
  });

  it('should save a training successfully', () => {
    page.navigateTo();
    expect(page.submitValidTraining()).toEqual(''); //indicates that the round-trip succeeded
  });
});
