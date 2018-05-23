import { EmojiJsonConfig } from '@modules/emoji-picker/services/emoji/emoji-json-config.service';
import { CategoryConfig } from '@modules/emoji-picker/services/category/category-config.service';
import { EmojiSheetConfig } from '@modules/emoji-picker/services/sheet/emoji-sheet-config.service';
import { CssConfig } from '@modules/emoji-picker/services/css/css-config.service';

export { EmojiJsonConfig, CategoryConfig, EmojiSheetConfig, CssConfig };


import { ProxyObserver } from '@proxy';


/* class ConfigParameters {
    sheet = Proxy.createObserver(new EmojiSheetConfig());
    category = Proxy.createObserver(new CategoryConfig());
    emoji = Proxy.createObserver(new EmojiJsonConfig());
}
 */

export class ConfigData {
    sheet = undefined; // ProxyObserver.create(new EmojiSheetConfig());
    category = undefined; //  ProxyObserver.create(new CategoryConfig());
    emoji = undefined; //  ProxyObserver.create(new EmojiJsonConfig());
    css = undefined; // ProxyObserver.create(new CssConfig());

    constructor() { }


}
