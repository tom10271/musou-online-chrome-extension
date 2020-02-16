import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppCommonModule} from "./common.module";
import {SettingModule} from "./modules/setting/setting.module";
import {RouterModule} from "@angular/router";
import {DailyLoginModule} from "./modules/daily-login/daily-login.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([], {
            useHash: true
        }),
        AppCommonModule,
        SettingModule,
        DailyLoginModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
