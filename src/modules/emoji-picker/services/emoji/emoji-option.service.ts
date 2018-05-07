import { Injectable } from '@angular/core';
import { EmojiJsonConfig, JsonParameters, Mode } from './emoji-json-config.service';
import { Util } from '@util/util';
// import { URLParameters } from './emoji-url-types';
import { Proxy, ProxyType, ProxyTypeObserver } from '@proxy/proxy';


@Injectable()
export class EmojiOption {
    config: ProxyTypeObserver<EmojiJsonConfig>;

    constructor(config: EmojiJsonConfig) {
        this.config = Proxy.createObserver(config);
    }


    /* setParameter(parameters: JsonParameters) {
        Util.assignRecursive(this.config.parameters, parameters);
    }
 */

    get url(): string {
        return this.config.online.$$(this.config.parameters.$$);
    }

    get top() {
        return this.config.offline.$$(this.config.parameters.$$);
    }

    /*  get offline() {
         return this.config.offline;
     }

     set mode(mode: Mode) {
         this.config.mode = mode;
     }

     get mode() {
         return this.config.mode;
     } */
}
