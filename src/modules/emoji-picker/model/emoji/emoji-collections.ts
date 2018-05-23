
import { Returnable } from '@json-object-parser/returnable';
import { ByCategory, Collections } from './collections';


export class EmojiCollections extends Collections implements Returnable {


    constructor() {
        super();
    }

    public push(index: number, emoji: any, level: number, done: boolean) {
        this.pushCategory(emoji.category, emoji);
        this.all.push(emoji);

        // delete emoji.category;
    }

    public value() {
        return { list: this.all, byCategory: this._byCategory, this: this };
    }

}
