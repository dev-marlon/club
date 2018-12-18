import { browser, by, element } from 'protractor';

export class AppPage {
    public navigateTo(): wdpm.Promise<any> {
        return browser.get('/');
    }

    public getTitleText(): string {
        return element(by.css('app-root h1')).getText();
    }
}
