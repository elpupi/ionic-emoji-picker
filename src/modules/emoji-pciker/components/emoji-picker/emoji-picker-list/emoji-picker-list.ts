import { Component, ViewChildren, Input, Output, QueryList, EventEmitter } from '@angular/core';
import { EmojiCategory } from '../../emoji-category/emoji-category';
// import { ByCategory } from '@model/emoji/collections';
import { EmojiData } from '@model/emoji/emoji-data';
import { Categories, Category } from '@model/category/category';
import { EmojiCollections } from '@model/emoji/emoji-collections';
import { ByCategory } from '@model/emoji/collections';


@Component({
    selector: 'mt-emoji-picker-list',
    templateUrl: 'emoji-picker-list.html'
})
export class EmojiPickerList {
    @ViewChildren(EmojiCategory) emojiCategory: QueryList<EmojiCategory>;
    // @Input('mtEmojisByCategory') emojisByCategory: ByCategory;
    private _emojisByCategory: ByCategory;
    // @Input('mtEmojisCategories') categories: Categories;
    private _categories: Categories;
    public filterdCategories: Categories;
    // private _categories: EmojiData[];

    @Output('mtEmojiSelection') emojiSelectionEmitter = new EventEmitter<EmojiData>();


    constructor() { }


    /*    @Input('mtEmojisCategories')
       public set categories(categories: EmojiData[]) {
           const nonEmptyCategories: EmojiData[] = [];

           for (const emojiCategory of categories) {
            this.emojisByCategory[emojiCategory.category] !== undefined &&
            if (this.emojisByCategory[emojiCategory.category].length !== 0)
                   nonEmptyCategories.push(emojiCategory);
           }

           this._categories = nonEmptyCategories;
       }

       public get categories() {
           return this._categories;
       }
    */

    @Input('mtEmojisCategories')
    set categories(categories: Categories) {
        this._categories = categories;
        this.filterdCategories = categories;
    }

    get categories() {
        return this._categories;
    }


    @Input('mtEmojisByCategory')
    public set emojisByCategory(byCategory: ByCategory) {
        this._emojisByCategory = byCategory;
        this.filterNonEmptyCategories();
    }

    public get emojisByCategory() {
        return this._emojisByCategory;
    }

    private filterNonEmptyCategories() {
        if (this.categories) {
            this.filterdCategories = this.categories.filter(c => {
                return Object.keys(this.emojisByCategory).find(category => c.category === category) !== undefined;
            });
        }
    }

    public selectCategory(category: Category) {
        this.emojiCategory.forEach((emojiCategory: EmojiCategory) => {

            if (emojiCategory.category.category === category.category) {
                emojiCategory.scrollIntoView();
            }

        });
    }


    public emojiSelected(emoji: EmojiData) {
        this.emojiSelectionEmitter.emit(emoji);
    }

}
