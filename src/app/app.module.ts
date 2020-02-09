import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppCommonModule} from "./common.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppCommonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
