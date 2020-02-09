import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { StoreState } from '../../services/store.reducer';

@Injectable()
@Pipe({ name: 'hbxLocalDate', pure: false })
export class LocalDatePipe implements PipeTransform {
    private store$: Observable<StoreState>;
    displayHKT = false;

    constructor(
        private store: Store<any>
    ) {
        this.store$ = store.select('store');
        this.store$.subscribe(state => {
            this.displayHKT = state.displayHKT;
        });
    }

    transform(date: string, format: string = 'YYYY-MM-DD HH:mm'): string {
        if (!date) {
            return '';
        }

        let dateMoment = moment(date).parseZone();

        if (this.displayHKT) {
            dateMoment.utcOffset('+08:00');
        }

        return dateMoment.format(format);
    }
}
