import { Injectable } from '@angular/core';

import { CategoryConfig } from './category-config.service';
import { Emoji } from '@services/emoji/emoji.service';
import { Collections, ByCategory } from '@model/emoji/collections';
import { EmojiData } from '@model/emoji/emoji-data';
import { Categories } from '@model/category/category';

import { ProxyObserver, ProxyTypeObserver } from '@proxy';


import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map, startWith } from 'rxjs/operators';



@Injectable()
export class Category {
    private _categories: Categories;

    config: ProxyTypeObserver<CategoryConfig>;

    constructor(config: CategoryConfig) {
        this.config = ProxyObserver.create(config);
    }


    categories(emojiCollections: Collections) {
        if (this._categories === undefined)
            this.createCategories(emojiCollections);

        return this._categories;
    }

    private createCategories(emojiCollections: Collections) {
        this._categories = [];
        const configCategories = this.config.categories.$$;
        const emojisCategories = emojiCollections.categories;

        const lowerCase = (v1: string, v2: string) => v1.toLowerCase() === v2.toLowerCase();


        for (const c of configCategories) { // emojiCollections.categories) {
            const category = emojisCategories.find(category => category === c.category);

            if (category) {
                const emoji = emojiCollections.fromProperty('unified', c.emoji.unified, lowerCase);

                if (emoji) // should be true always
                    this._categories.push({ category, emoji });

            }
        }

    }

}
