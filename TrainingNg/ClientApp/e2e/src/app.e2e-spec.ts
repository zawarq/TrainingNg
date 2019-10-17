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

  it('should not save an invalid training', () => {
    page.navigateTo();
    expect(page.submitInValidTraining()).toBeGreaterThan(0); //indicates that an error was produced
  });

  it('should catch negative training periods', () => {
    page.navigateTo();
    expect(page.submitNegativeTraining()).toBeGreaterThan(0); //indicates that an error was produced
  });
  
  it('should save a training successfully', () => {
    page.navigateTo();
    expect(page.submitValidTraining()).toEqual(''); //indicates that the round-trip succeeded
  });
});
