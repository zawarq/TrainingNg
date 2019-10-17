import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getMainHeading() {
    return element(by.css('app-root h1')).getText();
  }

  submitValidTraining() {
    var form = element(by.id('trainingFormGroup'));
    var name = element(by.id('name'));
    name.sendKeys('Protractor Test Training');
    var start = element(by.id('start'));
    start.sendKeys("07/24/2018");
    var end = element(by.id('end'));
    end.sendKeys("09/13/2018");

    var button = element(by.id('confirm'));

    //wait for dirty checking etc.
    browser.sleep(2000);

    button.click();

    browser.waitForAngular();

    name = element(by.id('name'));
    return name;
  }

  submitInValidTraining() {
    var name = element(by.id('name'));
    name.sendKeys('Protractor Test Training');
    var start = element(by.id('start'));
    start.clear();
    var end = element(by.id('end'));
    end.sendKeys("09/13/2018");

    var button = element(by.id('confirm'));

    //wait for dirty checking etc.
    browser.sleep(2000);

    button.click();

    browser.waitForAngular();

    name = element(by.id('name'));
    return name.getAttribute('value').then(function (text) {
      return text.trim().length;
    });
  }

  submitNegativeTraining() {
    var name = element(by.id('name'));
    name.sendKeys('Protractor Test Training');
    var start = element(by.id('start'));
    start.sendKeys("07/24/2019");
    var end = element(by.id('end'));
    end.sendKeys("09/13/2018");

    var button = element(by.id('confirm'));

    //wait for dirty checking etc.
    browser.sleep(2000);

    button.click();

    browser.waitForAngular();

    name = element(by.id('name'));
    return name.getAttribute('value').then(function (text) {
      return text.trim().length;
    });
  }
}
