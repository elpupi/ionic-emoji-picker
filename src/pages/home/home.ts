import { Component } from '@angular/core';
import { CaretEvent } from '../../modules/emoji-pciker/lib/caret-event';
import { EmojiData } from '@model/emoji/emoji-data';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public content = ''; // 'Type letters...';
    public selectEvent = '';
    public caretEvent = '';

    private lastCaretEvent: CaretEvent;

    constructor() { }

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
