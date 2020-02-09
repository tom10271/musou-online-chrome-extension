import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, switchMap, take } from "rxjs/operators";

import { StoreState } from "../../services/store.reducer";

@Pipe({
    name: "hbxWarehouseName"
})
export class WarehouseNamePipe implements PipeTransform {
    private store$: Observable<StoreState>;

    constructor(private store: Store<any>) {
        this.store$ = store.select('store');
    }

    transform(id) {
        return this.store$
            .pipe(
                map((state: StoreState) => state.warehouses),
                take(1),
                switchMap(warehouses => {
                    return new Observable(subscribe => {
                        const warehouse = warehouses.filter(v => v.id == id);

                        subscribe.next(warehouse.length ? warehouse[0].name : null);
                        subscribe.complete();
                    });
                })
            );
    }
}
