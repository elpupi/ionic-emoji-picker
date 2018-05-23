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
import { filter, takeUntil } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';



@Component({
    selector: 'mt-emoji-picker-button',
    templateUrl: 'emoji-picker-button.html'
})
export class EmojiPickerButton {

    @Input('mtEmoji') emoji: EmojiData;
    // private _emoji: EmojiData;
    @Input('mtDataToEmit') dataToEmit;
    @Input('mtOptions') options;
    @Input('mtFitzpatrick') fitzpatrick;

    @Output('mtSelection') selectionEmitter: EventEmitter<EmojiData> = new EventEmitter();


    public ngStyle: { [cssProperty: string]: string | number } = {};
    public ngClass: { [className: string]: boolean };
    public innerHTML = '';
    private sheet: ProxyTypeObserver<Sheet>;
    //  private _isSkeleton: ProxyTypeObserver<boolean>;
    // private styleSubscription: Subscription;
    private destroy$: Subject<boolean> = new Subject<boolean>();


    constructor(emojiSheet: EmojiSheet, private css: Css, private codeToUnicode: CodeToUnicodePipe) {
        this.sheet = emojiSheet.config.parameters.sheet;
        // this._isSkeleton = ProxyObserver.create();
    }

    /*  @Input('mtEmoji') set emoji(emoji: EmojiData) {
         const isSkeleton = emoji.unified === 'skeleton_emoji';

         if (this._isSkeleton.$$ !== isSkeleton) // reset only if the state change
             this._isSkeleton.$(isSkeleton);

         this._emoji = emoji;
     } */

    /*  get emoji() {
         return this._emoji;
     }
  */

    private get isSkeleton() {
        return this.emoji.unified === 'skeleton_emoji';
    }


    public ngOnInit() {
        this.css.buttonStyle.changed$.pipe(
            takeUntil(this.destroy$)
        ).subscribe((buttonStyle) => this.ngStyle = buttonStyle.value(this.emoji, this.isSkeleton));


        this.sheet.use.changed$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(use => {
            this.innerHTML = !use.value ? this.codeToUnicode.transform(this.emoji.unified) : '';
        });

        this.sheet.use.changed$.pipe(
            takeUntil(this.destroy$)
        ).subscribe((use) => {
            this.ngClass = {
                'emoji-button--skeleton': this.isSkeleton,
                'emoji-button': true,
                'emoji-button--unicode': !use.value,
                'emoji-button--sheet': use.value,
            };
        });
    }

    public buttonClikedHandler() {
        // this._emojiPickerRef.instance.selectionEmitter.subscribe(event => this.selectEmitter.emit(EmojiEvent.fromArray(event)))
        // this.selectionEmitter.emit(this.dataToEmit || this.emoji);
        /*  const event = this.dataToEmit || this.emoji;
         this.selectionEmitter.emit(EmojiEvent.fromArray(event)); */
        if (!this.isSkeleton)
            this.selectionEmitter.emit(this.emoji);
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
