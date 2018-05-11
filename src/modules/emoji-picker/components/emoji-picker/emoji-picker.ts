import { Component, EventEmitter, Input, Output, ElementRef, Renderer } from '@angular/core';
import { EmojiData } from '@model/emoji/emoji-data';
import { Dimension } from '@model/dimension/dimension';
import { Css } from '@services/css/css.service';

/* import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { takeUntil } from 'rxjs/operator/takeUntil'; */

@Component({
    selector: 'mt-emoji-picker',
    templateUrl: 'emoji-picker.html',
    host: {
        '[style.width.px]': 'width',
        '[style.height.px]': 'height'
    }
})
export class EmojiPicker {
    public forcedDimension: Dimension = { width: undefined, height: undefined };
    //  @Input('mtDimension') dimension: Dimension;
    public width: number;
    public height: number;

    @Input('mtInputAutofocus') inputAutofocus: boolean;

    @Output('mtEmojiSelect') emojiSelectEmitter = new EventEmitter();
    @Output('mtPickerClose') pickerCloseEmitter = new EventEmitter();

    private emojiPickerAutofocus: boolean;

    private currentTarget: ElementRef;

    constructor(private css: Css, private elementRef: ElementRef) {
        this.css.config.content.list.buttons.button.sizeRequired = 25;

        css.config.content.changed$.subscribe(({ prop, value }) => {
            this.width = value.width;
            this.height = value.height;
        });
    }


    private setPercentageDimension() {
        /*  if (this.elementRef === undefined)
             return; */ // wait ngOnInit


        const cssDimension = this.getCssDimension();

        const dimension = {
            width: this.forcedDimension.width || cssDimension.width || 600,
            height: this.forcedDimension.height || cssDimension.height || 700
        };

        this.css.config.content = this.getPxDimension(dimension);
    }

    private getPxDimension(dimension: Dimension) {
        const pxDimension = dimension;

        const emojiPicker = this.elementRef.nativeElement as HTMLElement;
        const style = getComputedStyle(emojiPicker);

        const rect = emojiPicker.parentElement.getBoundingClientRect();

        const dirToSide = {
            width: ['Left', 'Right'],
            height: ['Top', 'Bottom']
        };
        const paddingAndBorder = (direction: string) => {
            const side1 = dirToSide[direction][0];
            const side2 = dirToSide[direction][0];

            return parseNumber(style.padding[side1]) - parseNumber(style.padding[side2]) -
                parseNumber(style.border[side1]) - parseNumber(style.border[side2]);
        };


        for (const direction of ['width', 'height']) {
            const size = dimension[direction];

            if (!(size > 1))
                pxDimension[direction] = size * rect[direction] - paddingAndBorder(direction);
        }

        return pxDimension;
    }


    private getCssDimension() {
        const dimension = {} as Dimension;

        const emojiPicker = this.elementRef.nativeElement as HTMLElement;

        for (const direction of ['width', 'height']) {
            const size = getComputedStyle(emojiPicker)[direction];

            if (size.endsWith('px'))
                dimension[direction] = parseNumber(size);

            else {
                // styleWidth in %
                let s: number = undefined;

                if (size === 'auto')
                    s = 1;
                else
                    s = parseNumber(size) / 100;

                dimension[direction] = parseNumber(s);

            }
        }

        return dimension; // width/height lying in [0,1] means it's a percentage
    }


    @Input('mtDimension') set dimension(dimension: Dimension) {
        this.forcedDimension = dimension;
        this.setPercentageDimension();
        // this.css.config.content = dimension;
    }

    /*  get dimension() {
         return this._dimension;
     } */


    public setAutofocus(value) {
        this.emojiPickerAutofocus = value;
    }

    emojiSelectedHandler(emoji: EmojiData) {
        this.emojiSelectEmitter.emit(emoji);
    }

}


function parseNumber(value: any) {
    return parseFloat(value) || 0;
}
