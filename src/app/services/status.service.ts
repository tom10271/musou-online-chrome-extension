import {Injectable} from '@angular/core';
import {Settings} from "../models/Settings";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StatusService {
    settings$: Observable<Settings>;

    constructor() {
        this.settings$ = new Observable(subscriber => {
            chrome.storage.local.get('settings', ({ settings }) => {
                subscriber.next(<Settings>settings || new Settings());

                subscriber.complete();
            });
        });
    }

    updateSettings$(settings: Settings) {
        return new Observable(subscriber => {
            chrome.storage.local.set({
                settings
            }, () => {
                subscriber.complete();
            });
        });
    }
}
