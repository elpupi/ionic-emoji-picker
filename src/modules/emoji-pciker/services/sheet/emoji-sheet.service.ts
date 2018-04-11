import { Injectable } from '@angular/core';

import { EmojiSheetConfig } from './emoji-sheet-config.service';

@Injectable()
export class EmojiSheet {

    constructor(private config: EmojiSheetConfig) { }

    get url() {
        return this.config.url;
    }

    get sheet() {
        return this.config.sheet;
    }


    /* get locator() {
        return this.options.locator;
    } */
}
