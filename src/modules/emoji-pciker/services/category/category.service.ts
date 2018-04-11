import { Injectable } from '@angular/core';

import { CategoryConfig } from './category-config.service';
import { Emoji } from '@services/emoji/emoji.service';
import { Collections, ByCategory } from '@model/emoji/collections';
import { EmojiData } from '@model/emoji/emoji-data';
import { Categories } from '@model/category/category';


import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map, startWith } from 'rxjs/operators';



@Injectable()
export class Category {
    private _categories: Categories;

    constructor(private config: CategoryConfig) { }


    categories(emojiCollections: Collections) {
        if (this._categories === undefined)
            this.createCategories(emojiCollections);

        return this._categories;
    }

    private createCategories(emojiCollections: Collections) {
        this._categories = [];
        const configCategories = this.config.categories;

        const lowerCase = (v1: string, v2: string) => v1.toLowerCase() === v2.toLowerCase();


        for (const categoryName of emojiCollections.categories) {
            const category = configCategories.find(c => c.category === categoryName);

            if (category) {
                const emoji = emojiCollections.fromProperty('unified', category.emoji.unified, lowerCase);

                if (emoji) // should be true always
                    this._categories.push({ category: categoryName, emoji });

            }
        }

    }

}
