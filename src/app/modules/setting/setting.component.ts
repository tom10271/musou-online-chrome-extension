import {Component, OnInit} from '@angular/core';
import {Account} from "../../models/Settings";
import {BaseComponent} from "../../reusable/classes/BaseComponent";
import {CommonDIContainer} from "../../services/CommonDIContainer";

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss']
})
export class SettingComponent extends BaseComponent implements OnInit {
    batchAccountsImportSettings: string = ``;

    constructor(
        diContainer: CommonDIContainer,
    ) {
        super(diContainer);
    }

    saveSettings() {
        const settingsClone = Object.assign({}, this.settings);

        this.batchAccountsImportSettings
            .split("\n")
            .map((each) => each.trim())
            .map(each => each.split(','))
            .map((each) => {
                const account = new Account();
                account.loginName = each[0];
                account.password = each[1];

                if (each.length >= 3) {
                    account.functionsEnabled.dailyLogin = each[2].toLowerCase() === 'true';
                }

                if (each.length >= 4) {
                    account.groupNameStr = each[3];
                }

                return account;
            })
            .forEach(each => {
                const existingAccount = settingsClone.accounts.filter(eachExisting => eachExisting.loginName === each.loginName);

                if (existingAccount.length) {
                    existingAccount[0].password = each.password;
                    existingAccount[0].functionsEnabled.dailyLogin = each.functionsEnabled.dailyLogin;
                } else {
                    settingsClone.accounts.push(each);
                }
            });

        this.batchAccountsImportSettings = '';

        settingsClone.accounts = settingsClone.accounts.filter((each) => {
            return each.loginName && each.password;
        });

        settingsClone.accounts = settingsClone.accounts.map((each: Account) => {
            each.groupNames = each.groupNameStr
                .split("|")
                .map((each) => each.trim())
                .filter(each => each !== "");

            return each;
        });

        this.statusService
            .updateSettings$(settingsClone)
            .subscribe(() => {
                this.router.navigate(['/']);
            })
    }

    addBlankAccount() {
        this.settings.accounts.push(new Account());
    }
}
