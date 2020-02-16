import { Router } from "@angular/router";
import {Injectable, NgZone} from "@angular/core";
import {StatusService} from "./status.service";

@Injectable()
export class CommonDIContainer {
    inject: any = [
        'router',
        'ngZone',
        'statusService',
    ];

    constructor(
        public router: Router,
        public ngZone: NgZone,
        public statusService: StatusService,
    ) {}
}