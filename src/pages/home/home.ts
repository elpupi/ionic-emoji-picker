import { Component, QueryList, ViewChild, ElementRef } from '@angular/core';
import { CaretEvent } from '@modules/emoji-picker/lib/caret-event';
import { EmojiData } from '@model/emoji/emoji-data';
import { Dimension } from '@model/dimension/dimension';
import { Platform, PlatformString } from '@model/platform';
import { EmojiPicker } from '@components/emoji-picker/emoji-picker';

import { Content } from 'ionic-angular';
import { Stickies, ScrollContainer } from '@stickies';



@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    host: {
        '(window:resize)': 'onWindowResize($event)',
        // '(ionScroll)': 'onWindowScroll($event)'
    }
})
export class HomePage {
    public contentEdit = ''; // 'Type letters...';
    public selectEvent = '';
    public caretEvent = '';
    public dimension: Dimension = { width: 1, height: 700 };
    public resolution = 32;

    public platform: string;
    public platforms = Object.keys(new Platform());

    private lastCaretEvent: CaretEvent;

    @ViewChild(EmojiPicker) emojiPicker: EmojiPicker;

    private sticky: Stickies;

    @ViewChild(Content) content: Content;
    @ViewChild('toStick') toStick: ElementRef;
    @ViewChild('stickContainer') stickContainer: ElementRef;

    private scrollContainer: ScrollContainer;

    constructor() { }


    ngOnInit1() {
        this.addSticky();
    }

    private addSticky() {
        /*     this.scrollContainer = new ScrollContainer(this.content.getScrollElement(), false);

            this.sticky = new Stickies(this.stickContainer.nativeElement, { fastCheck: false, listScrollContainer: [this.scrollContainer] });
            setTimeout(() => {
                this.sticky.add(this.toStick.nativeElement);
            }, 0);

            this.content.ionScroll.subscribe(data => this.onWindowScroll(data)); */
    }

    onWindowResize() {
        this.emojiPicker.dimension = { width: 1, height: 700 };
        this.sticky.refreshAll();
    }

    onWindowScroll(event) {
        event.domWrite(() => {
            this.scrollContainer.scroll(event);
        });
    }

    emojiSelectedHandler(emoji: EmojiData) {
        // console.log('emoji selected -> ', event);
        // this.content = this.content.slice(0, this.lastCaretEvent.caretOffset) + this.codeToUnicode(emoji.unified) + this.content.slice(this.lastCaretEvent.caretOffset);
        // this.selectEvent = JSON.stringify(emoji);
        this.contentEdit += ' '.repeat(40) + this.codeToUnicode(emoji.unified);
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
