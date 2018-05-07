import { EmojiJsonConfig } from '@modules/emoji-picker/services/emoji/emoji-json-config.service';
import { CategoryConfig } from '@modules/emoji-picker/services/category/category-config.service';
import { EmojiSheetConfig } from '@modules/emoji-picker/services/sheet/emoji-sheet-config.service';

import { Proxy } from '@proxy/proxy';


/* class ConfigParameters {
    sheet = Proxy.createObserver(new EmojiSheetConfig());
    category = Proxy.createObserver(new CategoryConfig());
    emoji = Proxy.createObserver(new EmojiJsonConfig());
}
 */

export class ConfigData {
    sheet = Proxy.createObserver(new EmojiSheetConfig());
    category = Proxy.createObserver(new CategoryConfig());
    emoji = Proxy.createObserver(new EmojiJsonConfig());

    constructor() { }


}
