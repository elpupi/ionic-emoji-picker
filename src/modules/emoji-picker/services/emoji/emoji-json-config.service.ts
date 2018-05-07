import { Injectable } from '@angular/core';

import { UrlFunctor } from '@services/url.definition';
import { PlatformString } from '@model/platform';

import { EmojisAppleTop100 } from '@data/emojis-apple-top100';
import { Collections } from '@model/emoji/collections';
import { Util } from '@util/util';


/* export interface URLConfig {
    urlGenerator: UrlGenerator;
    parameters: URLParameters;
} */
export interface JsonParameters {
    platform: PlatformString;
}


export type Mode = 'online' | 'offline';


@Injectable()
export class EmojiJsonConfig {
    /*     public online?: URLConfig = {
            urlGenerator: URL.generateURL`assets/json/emojis-${'platform'}.json`,
            parameters: { platform: 'apple' } // default setting
        };
     */
    public online?: UrlFunctor<JsonParameters, string> = (parameters: JsonParameters) => `assets/json/emojis-${parameters.platform}.json`;
    public offline?: UrlFunctor<JsonParameters, Collections> = (parameters: JsonParameters) => new EmojisAppleTop100();

    parameters?: JsonParameters = { platform: 'apple' };


    public mode: Mode = 'online';

    constructor(config?: EmojiJsonConfig) {
        if (config !== undefined) Util.assignRecursive(this, config);
    }
}
