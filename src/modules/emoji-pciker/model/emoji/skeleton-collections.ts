
import { EmojiData } from '@model/emoji/emoji-data';
import { ByCategory, Collections } from './collections';


export class SkeletonCollections extends Collections {


    constructor(nbCategories: number, emojiByCategory: number) {
        super();
        this.createSkeleton(nbCategories, emojiByCategory);
    }

    public createSkeleton(nbCategories: number, emojiByCategory: number) {
        for (let c = 0; c < nbCategories; ++c) {
            const category = `skeleton${c}`;

            for (let i = 0; i < emojiByCategory; ++i) {
                const emoji = new EmojiData();
                emoji.category = category;

                this.pushCategory(category, emoji);
                this.all.push(emoji);
            }
        }
    }


}
