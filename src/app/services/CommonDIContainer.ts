import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import {StatusService} from "./status.service";

@Injectable()
export class CommonDIContainer {
    inject: any = [
        'router',
    ];

    constructor(
        public router: Router,
        public baseStatus: StatusService,
    ) {}
}