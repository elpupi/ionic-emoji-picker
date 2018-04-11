import { Component, EventEmitter, Input, Output, ElementRef, Renderer } from '@angular/core';
import { EmojiData } from '@model/emoji/emoji-data';
/* import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { takeUntil } from 'rxjs/operator/takeUntil'; */

@Component({
    selector: 'mt-emoji-picker',
    templateUrl: 'emoji-picker.html'
})
export class EmojiPicker {

    @Input('mtInputAutofocus') inputAutofocus: boolean;

    @Output('mtEmojiSelect') emojiSelectEmitter = new EventEmitter();
    @Output('mtPickerClose') pickerCloseEmitter = new EventEmitter();

    private emojiPickerAutofocus: boolean;

    private currentTarget: ElementRef;

    constructor() { }


    public setAutofocus(value) {
        this.emojiPickerAutofocus = value;
    }

    emojiSelectedHandler(emoji: EmojiData) {
        this.emojiSelectEmitter.emit(emoji);
    }

}
