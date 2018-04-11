import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Params, Options } from './options';
import { Http } from 'src/modules/core/http/http';


@Injectable()
export class HttpAngular implements Http {
    constructor(public http: HttpClient) { }

    public get(url: string, options: Options = {}) {
        // options.params = params;
        // options.withCredentials = true;

        return this.http.get(url, options as any);
    }

    public post(url: string, body: any | null, options: any = {}) {
        // options.withCredentials = true;

        // let body = this.createSearchParams(params);

        return this.http.post(url, body, options);
    }

    /* private createSearchParams(params: any) {
        let searchParams = new URLSearchParams();
        for (let k in params) {
            if (params.hasOwnProperty(k)) {
                searchParams.set(k, params[k]);
            }
        }

        return searchParams;
    } */
}
