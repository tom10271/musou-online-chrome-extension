import {Component} from '@angular/core';
import {BaseComponent} from "../../reusable/classes/BaseComponent";
import {CommonDIContainer} from "../../services/CommonDIContainer";
import {Account} from "../../models/Settings";

@Component({
    selector: 'app-daily-login',
    templateUrl: './daily-login.component.html',
    styleUrls: ['./daily-login.component.scss']
})
export class DailyLoginComponent extends BaseComponent {
    actionsToRun: string[] = [
        'dailyLogin',
        // 'collectStampReward',
        // 'raffleWithCoins',
        // 'collectRewardInBox',
        // 'screenCapWeapons'
    ];
    actionToRunIndex: number = 0;

    actionTranslation = {
        dailyLogin: '每人登入',
        collectStampReward: '無雙盤',
        raffleWithCoins: '抽獎',
        collectRewardInBox: '受取箱',
        screenCapWeapons: '輸出武器截圖',
    };

    accountsToLogin: Account[] = [];
    groupNames: { name: string, enabled: boolean }[] = [];
    i = 0;

    constructor(diContainer: CommonDIContainer) {
        super(diContainer);

        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (sender.tab && message.status) {
                this.ngZone.run(() => {
                    console.log({message});

                    switch (message.status) {
                        case 'LOGIN_PAGE_READY':
                            sendResponse({
                                account: this.accountsToLogin[this.i]
                            });

                            break;

                        case 'LOGGED_IN':
                            this.accountsToLogin[this.i].characterName = message.payload.accountName;

                            this.statusService
                                .updateSettings$(this.settings)
                                .subscribe(() => {
                                });

                            break;

                        case 'ACTION_FINISHED':
                            if (
                                this.actionsToRun[this.actionToRunIndex] === 'collectRewardInBox' &&
                                message.result && message.result.length > 0
                            ) {
                                this.accountsToLogin[this.i].rewardsToCollect = message.result;

                                console.log(this.settings);

                                debugger;

                                this.statusService
                                    .updateSettings$(this.settings)
                                    .subscribe(() => {
                                    });
                            }

                            this.actionToRunIndex++;

                            debugger;

                            if (this.actionToRunIndex >= this.actionsToRun.length) {
                                this.actionToRunIndex = 0;
                                this.i++;

                                if (this.i < this.accountsToLogin.length) {
                                    sendResponse({action: 'NEXT_ACCOUNT'});
                                } else {
                                    sendResponse({action: 'ALL_ACCOUNTS_HANDLED'});
                                }
                            } else {
                                chrome.storage.local.set({
                                    action: this.actionsToRun[this.actionToRunIndex]
                                }, () => {
                                    sendResponse({action: 'CONTINUE'});
                                });
                            }

                            break;
                    }
                });

                return true;
            }
        });
    }

    onInit() {
        this.groupNames = Object.values(
            this.settings.accounts.reduce((accu, account) => {
                account.groupNames.forEach((groupName) => {
                    if (!(groupName in accu)) {
                        accu[groupName] = {
                            name: groupName,
                            enabled: true
                        };
                    }
                });

                return accu;
            }, {})
        );

        console.log(this);
    }

    setOnOffForAllGroups(value) {
        this.groupNames.forEach(each => each.enabled = value);
    }

    resolveAccountsToLogin() {
        const enabledGroupNames = this.groupNames.map(each => each.enabled ? each.name : null).filter(each => each);

        this.accountsToLogin = this.settings.accounts.filter((each) => {
            if (each.functionsEnabled.dailyLogin && this.groupNames.length > 0) {
                if (enabledGroupNames.length === 0) {
                    return false;
                }

                if (each.groupNames.length > 0 && enabledGroupNames.length > 0) {
                    return each.groupNames.filter((each) => enabledGroupNames.indexOf(each) > -1).length > 0;
                }
            }

            return each.functionsEnabled.dailyLogin;
        });
    }

    begin() {
        this.actionToRunIndex = 0;
        this.i = 0;

        chrome.storage.local.set({
            action: this.actionsToRun[this.actionToRunIndex]
        }, () => {
            this.resolveAccountsToLogin();
            this.i = 0;

            console.log(this);

            if (this.accountsToLogin.length) {
                chrome.tabs.create({url: 'https://www.gamecity.ne.jp/waap/login/msol_sp'});
            }
        });
    }

    stop() {
        chrome.storage.local.set({action: null});
    }

    onActionSelectionChanged(action, value) {
        if (value) {
            this.actionsToRun.push(action);
        } else {
            this.actionsToRun.splice(this.actionsToRun.indexOf(action), 1);
        }
    }
}
