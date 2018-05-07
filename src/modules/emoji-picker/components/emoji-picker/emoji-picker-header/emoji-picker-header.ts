import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '@services/category/category.service';
import { EmojiData } from '@model/emoji/emoji-data';
import { Categories } from '@model/category/category';

@Component({
    selector: 'mt-emoji-picker-header',
    templateUrl: 'emoji-picker-header.html'
})
export class EmojiPickerHeader {

    @Input('mtEmojisCategories') emojisCategories: Categories;
    @Input('mtInputAutofocus') inputAutofocus: boolean;
    @Output('mtCategorySelection') categorySelection = new EventEmitter<EmojiData>();
    @Output('mtSearch') searchEmitter = new EventEmitter<string>();


    constructor(public category: Category) { }

    public searchHandler(event: string) {
        this.searchEmitter.emit(event);
    }

    public categorySelectedHandler(emoji: EmojiData) {
        this.categorySelection.emit(emoji);
    }

}
