import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'trim'})
export class TrimPipe implements PipeTransform {
    transform(value: any) {
        return !value ? '' : value.trim();
    }
}