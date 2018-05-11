import { Component, QueryList, ViewChild } from '@angular/core';
import { CaretEvent } from '@modules/emoji-picker/lib/caret-event';
import { EmojiData } from '@model/emoji/emoji-data';
import { Dimension } from '@model/dimension/dimension';
import { Platform, PlatformString } from '@model/platform';
import { EmojiPicker } from '@components/emoji-picker/emoji-picker';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    host: {
        '(window:resize)': 'onWindowResize($event)'
    }
})
export class HomePage {
    public content = ''; // 'Type letters...';
    public selectEvent = '';
    public caretEvent = '';
    public dimension: Dimension = { width: 1, height: 700 };
    public resolution = 32;

    public platform: string;
    public platforms = Object.keys(new Platform());

    private lastCaretEvent: CaretEvent;

    @ViewChild(EmojiPicker) emojiPicker: EmojiPicker;

    constructor() { }

    onWindowResize() {
        this.emojiPicker.dimension = { width: 1, height: 700 };
    }

    emojiSelectedHandler(emoji: EmojiData) {
        // console.log('emoji selected -> ', event);
        // this.content = this.content.slice(0, this.lastCaretEvent.caretOffset) + this.codeToUnicode(emoji.unified) + this.content.slice(this.lastCaretEvent.caretOffset);
        // this.selectEvent = JSON.stringify(emoji);
        this.content += ' '.repeat(40) + this.codeToUnicode(emoji.unified);
    }


    private codeToUnicode(code: string): string {
        return code.split('-').map(c => `&#x${c};`).join('');
    }

    pickerClosedHandler(event) {
        console.log('picker closed -> ', event);
    }

    handleCurrentCaret(event: CaretEvent) {
        // this.lastCaretEvent = event;
        //  this.caretEvent = `{ caretOffset : ${event.caretOffset}, caretRange: Range{...}, textContent: ${event.textContent} }`;
    }
}
