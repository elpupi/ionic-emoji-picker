import { EmojiData } from '@model/emoji/emoji-data';

export interface CategoryDefinition {
    category: string;
    emoji: {
        name: EmojiData['name'];
        unified: EmojiData['unified'];
    };

}
