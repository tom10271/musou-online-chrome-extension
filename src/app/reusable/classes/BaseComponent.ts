import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { saveAs } from 'file-saver/dist/FileSaver';
import { Observable, Observer } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { CommonDIContainer } from "../../services/CommonDIContainer";
import { AuthService } from "../../services/auth.service";
import { API_ENDPOINTS } from "../../services/ApiEndpoints";

export class BaseComponent implements OnInit {
    public authService: AuthService = null;
    public state: any = {
        isOnInitialize: false
    };

    protected httpClient: HttpClient = null;
    protected router: Router = null;

    constructor(
        protected diContainer: CommonDIContainer
    ) {
        for (let key of diContainer.inject) {
            if (key in this) {
                this[key] = diContainer[key];
            }
        }
    }

    ngOnInit() {
        this.state.isOnInitialize = false;

        this.onInit();
    }

    onInit() {
        this.state.isOnInitialize = true;
    }

    runAfter$(returnValue: any | any[], callback: (...args: any[]) => any | void) {
        return new Observable((o: Observer<any>) => {
            if (returnValue instanceof Observable) {
                returnValue.subscribe((...args: any[]) => {
                    o.next(
                        callback(...args)
                    );

                    o.complete();
                });
            } else if (returnValue instanceof Array) {
                o.next(
                    callback(...returnValue)
                );

                o.complete();
            } else {
                o.next(
                    callback(returnValue)
                );

                o.complete();
            }
        });
    }

    log() {
        console.log.apply(arguments);
    }

    retrieveVariantsRequest(skusInput: Array<string> | string, limit: number = 999, isKeyword: boolean = false) {
        const skus = typeof skusInput === 'string' ? skusInput : skusInput.join();
        const attr = isKeyword ? 'keyword' : 'sku';

        return this.httpClient
            .post<any>(
                `${ API_ENDPOINTS.VARIANTS }/autocomplete?limit=${ limit }`,
                {
                    criteria: {
                        [attr]: skus
                    }
                }
            )
            .pipe(
                map(res => res._embedded.items)
            );
    }

    exportDataArrayToCSV(fileName: string, data: any[]) {
        const header = Object.keys(data[0]);

        let csvData = data
            .map(
                row => header.map(
                    fieldName =>
                        JSON.stringify(
                            row[fieldName],
                            (key, value) => value === null ? '' : value
                        )
                ).join(',')
            );

        csvData.unshift(
            header.join(',')
        );

        saveAs(
            new Blob([
                csvData.join('\r\n')
            ], {
                type: 'text/csv'
            }),
            fileName
        );
    }

    bulkEdit(
        args: {
            endpoint,
            ids: number[],
            payload: any,
            onSucceeded: (result: any[]) => void,
            onFailed?: (error: any[]) => void
        }
    ) {
        const xhrData = {};

        args.ids.forEach(id => {
            xhrData[id] = args.payload;
        });

        this.httpClient
            .patch(
                args.endpoint,
                JSON.stringify(xhrData)
            )
            .subscribe(
                args.onSucceeded,
                args.onFailed ?
                    args.onFailed :
                    error => {
                        alert(error);
                    }
            );

    }
}
