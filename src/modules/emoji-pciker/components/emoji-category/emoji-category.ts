import { Component, Input, ElementRef } from '@angular/core';
import { EmojiData } from '@model/emoji/emoji-data';
import { Category } from '@model/category/category';

@Component({
    selector: 'mt-emoji-category',
    templateUrl: 'emoji-category.html'
})
export class EmojiCategory {

    @Input('mtCategory') category: Category;

    constructor(private _element: ElementRef) { }

    public scrollIntoView() {
        this._element.nativeElement.scrollIntoView();
    }

}
