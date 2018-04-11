import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmojiData } from '@model/emoji/emoji-data';
import { Categories, Category } from '@model/category/category';


@Component({
    selector: 'mt-emoji-categories',
    templateUrl: 'emoji-categories.html'
})
export class EmojiCategories {
    @Input('mtEmojisCategories') emojisCategories: Categories;
    @Output('mtCategorySelection') categorySelection = new EventEmitter<Category>();

    constructor() { }

    handleCategorySelection(emoji: EmojiData) {
        this.categorySelection.emit(this.emojisCategories.find(category => category.category === emoji.category));
    }

}
