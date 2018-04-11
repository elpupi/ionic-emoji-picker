import { Injectable } from '@angular/core';
import { EmojiOptionConfig } from './emoji-option-config.service';
import { URLParameters } from './emoji-url-types';


@Injectable()
export class EmojiOption {

    constructor(private config: EmojiOptionConfig) { }


    public static generateURL(strings: TemplateStringsArray, ...keys: string[]) {
        const found = keys.find(key => key === 'platform');
        if (found === undefined) {
            // tslint:disable-next-line:quotemark
            throw new Error("the template string must have at least a parameter ${'platform'}");
        }


        const nbStrings = strings.length;

        return function () {
            if (Object.keys(this.parameters).length !== keys.length) {
                throw new Error(`parameters.length has to be ${keys.length}`);
            }

            let res = '';

            for (let i = 0; i < nbStrings; ++i) {
                res += strings[i] + (this.parameters[keys[i]] || '');
            }

            return res;
        };
    }


    setParameter(parameters: Partial<URLParameters>) {
        Object.assign(this.config.online.parameters, parameters);
    }


    get url(): string {
        return this.config.online.urlGenerator();
    }

    get top() {
        return this.config.offline;
    }
}
