import { Injectable } from '@angular/core';

import { UrlGenerator, URLParameters } from './emoji-url-types';
import { EmojiOption } from '@services/emoji/emoji-option.service';

import { EmojisAppleTop100 } from '@data/emojis-apple-top100';
import { Collections } from '@model/emoji/collections';


export interface URLConfig {
    urlGenerator: UrlGenerator;
    parameters: URLParameters;
}


@Injectable()
export class EmojiOptionConfig {
    public online?: URLConfig = {
        urlGenerator: EmojiOption.generateURL`assets/json/emojis-${'platform'}.json`,
        parameters: { platform: 'apple' } // default setting
    };

    public offline?: Collections = new EmojisAppleTop100();


    constructor(config?: EmojiOptionConfig) {
        if (config !== undefined) Object.assign(this, config);
    }
}
