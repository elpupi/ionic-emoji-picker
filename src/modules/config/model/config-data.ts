import { EmojiJsonConfig } from '@modules/emoji-picker/services/emoji/emoji-json-config.service';
import { CategoryConfig } from '@modules/emoji-picker/services/category/category-config.service';
import { EmojiSheetConfig } from '@modules/emoji-picker/services/sheet/emoji-sheet-config.service';
import { Content } from '@modules/emoji-picker/services/css/css.service';


import { ProxyObserver } from '@proxy';


/* class ConfigParameters {
    sheet = Proxy.createObserver(new EmojiSheetConfig());
    category = Proxy.createObserver(new CategoryConfig());
    emoji = Proxy.createObserver(new EmojiJsonConfig());
}
 */

export class ConfigData {
    sheet = ProxyObserver.create(new EmojiSheetConfig());
    category = ProxyObserver.create(new CategoryConfig());
    emoji = ProxyObserver.create(new EmojiJsonConfig());
    css = ProxyObserver.create({ content: new Content() });

    constructor() { }


}
