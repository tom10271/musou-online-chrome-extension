import { NgModule } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        RouterModule.forRoot([{
            path: '',
            component: HomeComponent,
        }], {
            useHash: true
        })
    ],
    declarations: [
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    providers: [
        {
            provide: CommonDIContainer,
            useFactory: (
                Router,
                Store,
                HttpClient,
                AuthService,
            ) => {
                return new CommonDIContainer(
                    Router,
                    Store,
                    HttpClient,
                    AuthService,
                )
            },
            deps: [
                Router,
                CommonStatus
            ]
        },
    ],
})
export class AppCommonModule {
}
