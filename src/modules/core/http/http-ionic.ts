
import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { Options } from './options';
import { Http } from './http';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class HttpIonic implements Http {
    private options: Options;

    constructor(public http: HTTP) { }

    public get(url: string, options: Options = {}) {
        this.options = options;

        const responseData = this.http.get(url, options.params, options.headers)
            .then(
            this.handleResponse,
            this.handleError
            );

        return fromPromise(responseData);
    }

    public post(url, options: Options = {}) {
        this.options = options;

        const responseData = this.http.post(url, options.params, options.headers)
            .then(
            this.handleResponse,
            this.handleError
            );

        return fromPromise(responseData);
    }

    private handleResponse(resp: HTTPResponse) {
        if (this.options.responseType === 'json')
            return JSON.parse(resp.data);


        return resp.data;
    }

    private handleError(resp: HTTPResponse & { url: string /* next version of interface */ }) {
        return Promise.reject(
            new HttpErrorResponse({
                error: resp.error,
                status: resp.status,
                headers: resp.headers,
                url: resp.url
            })
        );
    }
}
