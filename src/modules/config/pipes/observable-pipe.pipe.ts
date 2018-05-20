import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';

type PipeFuncion = (source: Observable<any>) => Observable<any>;

@Pipe({
    name: 'pipe'
})
export class ObservablePipePipe implements PipeTransform {
    transform(observable: Observable<any>, ...pipes: PipeFuncion[]) {
        return observable.pipe(...pipes);
    } // parseInt(code.split('-')[0], 16)
}
