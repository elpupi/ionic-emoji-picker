import { HttpObserve } from '@angular/common/http/src/client';
import { HttpParams, HttpHeaders } from '@angular/common/http';

export type Headers = HttpHeaders | {
    [header: string]: string | string[]
};
export type Params = HttpParams | {
    [param: string]: string | string[];
};



export interface Options {
    headers?: Headers;
    observe?: HttpObserve;
    params?: Params;
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
}
