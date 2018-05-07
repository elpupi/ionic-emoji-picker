import { Component, EventEmitter, Input, Output, ElementRef, Renderer } from '@angular/core';
import { EmojiData } from '@model/emoji/emoji-data';
import { Dimension } from '@model/dimension/dimension';
import { Css } from '@services/css/css.service';
/* import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { takeUntil } from 'rxjs/operator/takeUntil'; */

@Component({
    selector: 'mt-emoji-picker',
    templateUrl: 'emoji-picker.html'
})
export class EmojiPicker {
    public dimension: Dimension;


    @Input('mtInputAutofocus') inputAutofocus: boolean;

    @Output('mtEmojiSelect') emojiSelectEmitter = new EventEmitter();
    @Output('mtPickerClose') pickerCloseEmitter = new EventEmitter();

    private emojiPickerAutofocus: boolean;

    private currentTarget: ElementRef;

    constructor(private css: Css) { }


    @Input('mtDimension') set mtDimension(dimension: Dimension) {
        this.dimension = dimension || new Dimension();
        this.css.setContent(dimension);
        this.css.content.list.buttons.button.sizeRequired = 25;
    }


    public setAutofocus(value) {
        this.emojiPickerAutofocus = value;
    }

    emojiSelectedHandler(emoji: EmojiData) {
        this.emojiSelectEmitter.emit(emoji);
    }

}
