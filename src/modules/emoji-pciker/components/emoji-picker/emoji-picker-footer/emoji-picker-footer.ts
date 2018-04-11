import { Component, Input } from '@angular/core';
import { EmojiData } from '@model/emoji/emoji-data';

@Component({
    selector: 'mt-emoji-picker-footer',
    templateUrl: 'emoji-picker-footer.html'
})
export class EmojiPickerFooter {

    @Input('mtEmoji') emoji: EmojiData;

    constructor() {

    }

}
