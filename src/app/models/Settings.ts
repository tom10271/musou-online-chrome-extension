export class FunctionsEnabled {
    farming: boolean = false;
    dailyLogin: boolean = false;
}

export class Account {
    loginName: string = '';
    password: string = '';
    characterName: string = '';
    groupNameStr: string = '';
    groupNames: string[] = [];
    functionsEnabled: FunctionsEnabled = new FunctionsEnabled();
    rewardsToCollect: {
        itemName: string,
        count: string,
        expireDate: string,
    }[];
}

export class Settings {
    accounts: Account[] = [];
}
