import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmojiEvent } from '../../../lib/emoji-event';
import { EmojiData } from '@model/emoji/emoji-data';
import { EmojiSheet } from '@services/sheet/emoji-sheet.service';
import { Sheet } from '@services/sheet/emoji-sheet-config.service';
import { Css } from '@services/css/css.service';
import { CodeToUnicodePipe } from '@pipes/code-to-unicode.pipe';
import { ProxyTypeObserver } from '@proxy';



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


    public ngStyle: { [cssProperty: string]: string | number } = {};
    public ngClass: { [className: string]: boolean };
    public innerHTML = '';
    private sheet: ProxyTypeObserver<Sheet>;


    constructor(emojiSheet: EmojiSheet, private css: Css, private codeToUnicode: CodeToUnicodePipe) {
        this.sheet = emojiSheet.config.parameters.sheet;
    }

    public isSkeleton() {
        return this.emoji.unified === 'skeleton_emoji';
    }

    public ngOnInit() {
        if (this.sheet.use.$$ && !this.isSkeleton()) {
            /* this.ngStyle = {
                backgroundImage: `url(${this.emojiSheet.url})`,
                backgroundPositionX: `${-this.emoji.sheetX * (this.emojiSheet.resolution - 7)}px`,
                backgroundPositionY: `${-this.emoji.sheetY * (this.emojiSheet.resolution - 7)}px`
            }; */
            this.ngStyle = this.css.config.content.list.buttons.button.$$.style(this.emoji);
        }

        this.ngClass = {
            'emoji-button--skeleton': this.isSkeleton(),
            'emoji-button': true,
            'emoji-button--unicode': !this.sheet.use.$$,
            'emoji-button--sheet': this.sheet.use.$$,
        };

        if (!this.sheet.use.$$ && !this.isSkeleton())
            this.innerHTML = this.codeToUnicode.transform(this.emoji.unified);

    }

    public buttonClikedHandler() {
        // this._emojiPickerRef.instance.selectionEmitter.subscribe(event => this.selectEmitter.emit(EmojiEvent.fromArray(event)))
        // this.selectionEmitter.emit(this.dataToEmit || this.emoji);
        /*  const event = this.dataToEmit || this.emoji;
         this.selectionEmitter.emit(EmojiEvent.fromArray(event)); */
        if (!this.isSkeleton())
            this.selectionEmitter.emit(this.emoji);
    }
}
