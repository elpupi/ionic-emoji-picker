import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmojiEvent } from '../../../lib/emoji-event';
import { EmojiData } from '@model/emoji/emoji-data';
import { EmojiSheet } from '@services/sheet/emoji-sheet.service';


@Component({
    selector: 'mt-emoji-picker-button',
    templateUrl: 'emoji-picker-button.html'
})
export class EmojiPickerButton {

    @Input('mtEmoji') emoji: EmojiData;
    @Input('mtDataToEmit') dataToEmit;
    @Input('mtOptions') options;
    @Input('mtFitzpatrick') fitzpatrick;

    @Output('mtSelection') selectionEmitter: EventEmitter<EmojiData> = new EventEmitter();



    constructor(public emojiSheet: EmojiSheet) { }


    public buttonClikedHandler() {
        // this._emojiPickerRef.instance.selectionEmitter.subscribe(event => this.selectEmitter.emit(EmojiEvent.fromArray(event)))
        // this.selectionEmitter.emit(this.dataToEmit || this.emoji);
        /*  const event = this.dataToEmit || this.emoji;
         this.selectionEmitter.emit(EmojiEvent.fromArray(event)); */
        this.selectionEmitter.emit(this.emoji);
    }
}
