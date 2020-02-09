import {Injectable} from '@angular/core';
import {Settings} from "../models/Settings";

@Injectable({
    providedIn: 'root'
})
export class StatusService {
    settings: Settings;

    constructor() {
        chrome.storage.sync.get('settings', (settings) => {
            this.settings = <Settings>settings;
        });
    }

    updateSettings() {
        chrome.storage.sync.set({
            settings: this.settings
        });
    }
}
