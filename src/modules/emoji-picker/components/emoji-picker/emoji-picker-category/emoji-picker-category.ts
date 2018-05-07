import { Component, Input, ElementRef } from '@angular/core';
import { EmojiData } from '@model/emoji/emoji-data';
import { Category } from '@model/category/category';

@Component({
    selector: 'mt-emoji-picker-category',
    templateUrl: 'emoji-picker-category.html'
})
export class EmojiPickerCategory {

    @Input('mtCategory') category: Category;

    constructor(private _element: ElementRef) { }

    public scrollIntoView() {
        this._element.nativeElement.scrollIntoView();
    }

}
