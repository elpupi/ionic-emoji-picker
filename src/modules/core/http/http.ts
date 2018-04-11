import { Injectable, Provider } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

// angular
import { HttpClientModule } from '@angular/common/http';
// ionic
import { HTTP } from '@ionic-native/http';


import { HttpAngular } from './http-angular';
import { HttpIonic } from './http-ionic';
import { Options } from './options';


/* @Injectable()
export class Http {
    public http: HttpIonic | HttpAngular;

    constructor(private platform: Platform, private angularHttp: HttpAngular, private nativeHttp: HttpIonic) {
        this.http = this.platform.is('cordova') ? this.angularHttp : this.nativeHttp;
    }
} */

// export type HttpResponse = Observable<any>; // string | { [key: string]: any };

@Injectable()
export abstract class Http {
    abstract get(url: string, options?: Options): Observable<any>;
    abstract post(url: string, options?: Options): Observable<any>;

    static provider() {
        const provider: Provider[] = [
            HttpAngular,
            HttpIonic,
            {
                provide: Http,
                useFactory: (platform: Platform, angularHttp: HttpAngular, nativeHttp: HttpIonic) => {
                    return platform.is('cordova') ? nativeHttp : angularHttp;
                },
                deps: [Platform, HttpAngular, HttpIonic]
            }
        ];

        return provider;
    }
}
