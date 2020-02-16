import {NgModule, NgZone} from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {CommonDIContainer} from "./services/CommonDIContainer";
import {StatusService} from "./services/status.service";
import {TrimPipe} from "./reusable/pipes/trim.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        TrimPipe,
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,

        TrimPipe
    ],
    providers: [
        {
            provide: CommonDIContainer,
            useFactory: (
                Router,
                NgZone,
                StatusService,
            ) => {
                return new CommonDIContainer(
                    Router,
                    NgZone,
                    StatusService,
                )
            },
            deps: [
                Router,
                NgZone,
                StatusService,
            ]
        },
    ],
})
export class AppCommonModule {
}
