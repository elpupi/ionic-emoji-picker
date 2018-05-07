import { Injectable } from '@angular/core';
import { Http } from '@modules/core/http/http';
import { HttpErrorResponse } from '@angular/common/http';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { retry, catchError, shareReplay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


import { PlatformString } from '@model/platform';
import { EmojiOption } from './emoji-option.service';



@Injectable()
export class EmojiRequest {

    constructor(private http: Http, private emojiOption: EmojiOption) { }

    public get$() {
        return this.http.get(this.emojiOption.url).pipe(
            retry(3),
            catchError(this.handleError),
            shareReplay(1)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an ErrorObservable with a user-facing error message
        /* return new ErrorObservable(
            'Something bad happened; please try again later.'); */
        return of(undefined);
    }

    public set system(platform: PlatformString) {
        // this._system = `assets/emojis-${system}.json`;
        // this.emojiOption.setParameter({ platform });
        this.emojiOption.config.parameters.platform = platform as any;
    }

    public get url() {
        return this.emojiOption.url;
    }
}
