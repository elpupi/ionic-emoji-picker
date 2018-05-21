import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmojiEvent } from '../../../lib/emoji-event';
import { EmojiData } from '@model/emoji/emoji-data';
import { EmojiSheet } from '@services/sheet/emoji-sheet.service';
import { Sheet } from '@services/sheet/emoji-sheet-config.service';
import { Css } from '@services/css/css.service';
import { CodeToUnicodePipe } from '@pipes/code-to-unicode.pipe';
import { ProxyTypeObserver } from '@proxy';
import { combineLatest } from 'rxjs/internal/operators/combineLatest';
import { ProxyObserver } from '../../../../../../../Proxy/src/proxy/proxy-observer';



@Component({
    selector: 'mt-emoji-picker-button',
    templateUrl: 'emoji-picker-button.html'
})
export class EmojiPickerButton {

    // @Input('mtEmoji') emoji: EmojiData;
    private _emoji: EmojiData;
    @Input('mtDataToEmit') dataToEmit;
    @Input('mtOptions') options;
    @Input('mtFitzpatrick') fitzpatrick;

    @Output('mtSelection') selectionEmitter: EventEmitter<EmojiData> = new EventEmitter();


    public ngStyle: { [cssProperty: string]: string | number } = {};
    public ngClass: { [className: string]: boolean };
    public innerHTML = '';
    private sheet: ProxyTypeObserver<Sheet>;
    private _isSkeleton: ProxyTypeObserver<boolean>;


    constructor(emojiSheet: EmojiSheet, private css: Css, private codeToUnicode: CodeToUnicodePipe) {
        this.sheet = emojiSheet.config.parameters.sheet;
        this._isSkeleton = ProxyObserver.create();
    }

    @Input('mtEmoji') set emoji(emoji: EmojiData) {
        this._isSkeleton.$(emoji.unified === 'skeleton_emoji');
        this._emoji = emoji;
    }

    get emoji() {
        return this._emoji;
    }


    private get isSkeleton() {
        return this._isSkeleton; // this.emoji.unified === 'skeleton_emoji';
    }


    public ngOnInit() {
        this.sheet.use.changed$.pipe(
            combineLatest(this.isSkeleton.changed$)
        )
            .subscribe(([use, isSkeleton]) => {
                if (use.value) {
                    if (!isSkeleton.value)
                        this.css.buttonStyle.changed$.subscribe(buttonStyle => this.ngStyle = buttonStyle.value(this.emoji));
                    else
                        this.ngStyle = { 'margin.px': this.css.config.content.list.buttons.button.margin.$$ };

                } else {
                    if (!isSkeleton.value)
                        this.innerHTML = this.codeToUnicode.transform(this.emoji.unified);
                    else
                        this.innerHTML = '';
                }

                this.ngClass = {
                    'emoji-button--skeleton': isSkeleton.value,
                    'emoji-button': true,
                    'emoji-button--unicode': !use.value,
                    'emoji-button--sheet': use.value,
                };
            });


        /* if (this.sheet.use.$$ && !this.isSkeleton()) {
            this.css.buttonStyle.changed$.subscribe(buttonStyle => this.ngStyle = buttonStyle.value(this.emoji));
        } */

        /*  this.ngClass = {
             'emoji-button--skeleton': this.isSkeleton(),
             'emoji-button': true,
             'emoji-button--unicode': !this.sheet.use.$$,
             'emoji-button--sheet': this.sheet.use.$$,
         };
  */
        /*    if (!this.sheet.use.$$ && !this.isSkeleton())
               this.innerHTML = this.codeToUnicode.transform(this.emoji.unified); */

    }

    public buttonClikedHandler() {
        // this._emojiPickerRef.instance.selectionEmitter.subscribe(event => this.selectEmitter.emit(EmojiEvent.fromArray(event)))
        // this.selectionEmitter.emit(this.dataToEmit || this.emoji);
        /*  const event = this.dataToEmit || this.emoji;
         this.selectionEmitter.emit(EmojiEvent.fromArray(event)); */
        if (!this.isSkeleton.$$)
            this.selectionEmitter.emit(this.emoji);
    }
}
