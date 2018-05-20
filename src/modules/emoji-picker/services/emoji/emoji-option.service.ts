import { Injectable } from '@angular/core';
import { EmojiJsonConfig, JsonParameters, Mode } from './emoji-json-config.service';
import { Util } from '@util/util';
// import { URLParameters } from './emoji-url-types';
import { ProxyObserver, ProxyTypeObserver } from '@proxy';


@Injectable()
export class EmojiOption {
    config: ProxyTypeObserver<EmojiJsonConfig>;

    constructor(config: EmojiJsonConfig) {
        this.config = ProxyObserver.create(config);
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
