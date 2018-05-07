import { EmojiData } from '@model/emoji/emoji-data';

export interface Category {
    category: string;
    emoji: EmojiData;
}

export type Categories = Category[];
