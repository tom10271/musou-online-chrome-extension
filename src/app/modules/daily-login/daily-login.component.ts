import {Component} from '@angular/core';
import {BaseComponent} from "../../reusable/classes/BaseComponent";
import {CommonDIContainer} from "../../services/CommonDIContainer";

@Component({
    selector: 'app-daily-login',
    templateUrl: './daily-login.component.html',
    styleUrls: ['./daily-login.component.scss']
})
export class DailyLoginComponent extends BaseComponent {
    accountsToLogin = [];
    i = 0;
    
    constructor(diContainer: CommonDIContainer) {
        super(diContainer);

        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (sender.tab && message.status) {
                switch (message.status) {
                    case 'LOGIN_PAGE_READY':
                        sendResponse({
                            account: this.accountsToLogin[this.i]
                        });

                        break;

                    case 'LOGIN_FINISHED':
                        this.i++;

                        if (this.i < this.accountsToLogin.length) {
                            sendResponse({action: 'CONTINUE'});
                        } else {
                            sendResponse({action: 'ALL_LOGGED_IN'});
                        }

                        break;
                }
            }
        });
    }

    begin() {
        chrome.storage.sync.set({
            action: 'login'
        }, () => {
            this.accountsToLogin = this.settings.accounts.filter((each) => each.functionsEnabled.dailyLogin);
            this.i = 0;

            if (this.accountsToLogin.length) {
                chrome.tabs.create({url: 'https://www.gamecity.ne.jp/waap/login/msol_sp'});
            }
        })
    }

    stop() {
        chrome.storage.sync.set({ action: null });
    }
}
