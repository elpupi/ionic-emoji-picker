import { Injectable } from '@angular/core';

import { EmojiOption } from '@modules/emoji-picker/services/emoji/emoji-option.service';
import { Category } from '@modules/emoji-picker/services/category/category.service';
import { EmojiSheet } from '@modules/emoji-picker/services/sheet/emoji-sheet.service';

import { ConfigData } from '@config/model/config-data';


@Injectable()
export class ConfigParameters {
    private _config = new ConfigData();

    constructor(emoji: EmojiOption, category: Category, sheet: EmojiSheet) {
        this.config.emoji = emoji.config;
        this.config.category = category.config;
        this.config.sheet = sheet.config;
    }

    get config() {
        return this._config;
    }

}
