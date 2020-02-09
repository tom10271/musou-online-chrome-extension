export class FunctionsEnabled {
    farming: boolean = false;
    dailyLogin: boolean = false;
}

export class Account {
    loginName: string = '';
    password: string = '';
    functionsEnabled: FunctionsEnabled = new FunctionsEnabled();
}

export class Settings {
    accounts: Account[] = [];
}
