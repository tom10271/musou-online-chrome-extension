import {NgModule} from '@angular/core';
import {DailyLoginComponent} from './daily-login.component';
import {AppCommonModule} from "../../common.module";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [DailyLoginComponent],
    imports: [
        AppCommonModule,
        RouterModule.forChild([{
            path: 'run-scripts',
            component: DailyLoginComponent,
        }])
    ]
})
export class DailyLoginModule {
}
