import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ProxyTypeObserver } from '@proxy';

type PipeFuncion = (source: Observable<any>) => Observable<any>;

@Pipe({
    name: 'pipe'
})
export class ProxyMapPipe implements PipeTransform {
    transform<T, U>(proxy: ProxyTypeObserver<T>, ...pipes: PipeFuncion[]) {
        //  return observable.pipe(...pipes);
    } // parseInt(code.split('-')[0], 16)
}
