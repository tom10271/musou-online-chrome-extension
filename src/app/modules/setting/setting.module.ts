import {NgModule} from '@angular/core';
import {SettingComponent} from './setting.component';
import {RouterModule} from "@angular/router";
import {AppCommonModule} from "../../common.module";

@NgModule({
    declarations: [SettingComponent],
    imports: [
        AppCommonModule,
        RouterModule.forChild([{
            path: 'settings',
            component: SettingComponent,
        }])
    ]
})
export class SettingModule {
}
