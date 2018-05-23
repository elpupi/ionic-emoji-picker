import { Injectable } from '@angular/core';

import { ProxyObserver, ProxyTypeObserver } from '@proxy';
import { CssConfig } from './css-config.service';
import { EmojiSheet } from '@services/sheet/emoji-sheet.service';
import { Platform } from 'ionic-angular';

import { combineLatest } from 'rxjs/operators';
import { EmojiData } from '@model/emoji/emoji-data';



@Injectable()
export class Css {
    config: ProxyTypeObserver<CssConfig>;

    // button
    _buttonSize: ProxyTypeObserver<number>;
    _buttonWidth: ProxyTypeObserver<number>;
    _buttonStyle: ProxyTypeObserver<(emoji: EmojiData, forcedNotSheet?: boolean) => {
        'backgroundSize.px': number;
        backgroundImage: number;
        'backgroundPositionX.px': number;
        'backgroundPositionY.px': number;
        'margin.px': number;
    }>;


    // buttons

    _numberEmojisPerLine: ProxyTypeObserver<number>;
    _numberEmojisContent: ProxyTypeObserver<number>;
    _buttonsWidth: ProxyTypeObserver<number>;
    _buttonVariationsWidth: ProxyTypeObserver<(nbVariations: number) => number>;

    constructor(config: CssConfig, private emojiSheet: EmojiSheet, private platform: Platform) {
        this.config = ProxyObserver.create(config);

        // button
        this.createButtonSize();
        // this.createButtonVariationsWidth();
        this.createButtonWidth();
        this.createButtonStyle();

        // buttons
        this.createNumberEmojisPerLine();
        this.createNumberEmojisContent();
        this.createButtonsWidth();
    }


    // button
    createButtonSize() {
        this._buttonSize = ProxyObserver.create();

        this.config.content.list.buttons.button.sizeRequired.changed$.pipe(
            combineLatest(this.emojiSheet.config.parameters.resolution.changed$)
        ).subscribe(([sizeRequired, resolution]) => {
            // if we want 25px and resolution of emojiSheet is 32px we take 25.
            // if we want 25px and resoltion of emojiSheet is 16px we take 16px for not deteriorating

            const size = Math.min(sizeRequired.value, resolution.value);
            this._buttonSize.$(size);
        });
    }


    createButtonWidth() {
        this._buttonWidth = ProxyObserver.create();

        this.buttonSize.changed$.pipe(
            combineLatest(this.config.content.list.buttons.button.margin.changed$)
        ).subscribe(([size, margin]) => {
            // this.size + 2 * this.margin
            const width = size.value + 2 * margin.value;
            this._buttonWidth.$(width);
        });
        /*
          this._buttonWidth = ProxyObserver.create();

        this._buttonVariationsWidth.changed$.subscribe(buttonVariationsWidth =>
            this._buttonWidth.$(buttonVariationsWidth.value(1))); */

        //  this._buttonWidth = this.buttonsVariationsWidth.$map({ fromTo: btsVtWidth => btsVtWidth(1) });
    }


    /* createButtonVariationsWidth() {
        this._buttonVariationsWidth = ProxyObserver.create();

        this.buttonSize.changed$.pipe(
            combineLatest(this.config.content.list.buttons.button.margin.changed$)
        ).subscribe(([size, margin]) => {
            // this.size + 2 * this.margin
            const width = (nbVariations: number) => nbVariations * size.value + 2 * margin.value;
            this._buttonVariationsWidth.$(width);
        });
    }
 */

    createButtonStyle() {
        this._buttonStyle = ProxyObserver.create();


        this.emojiSheet.config.parameters.resolution.changed$.pipe(
            combineLatest(
                this.emojiSheet.config.parameters.sheet.margin.changed$,
                this.emojiSheet.config.parameters.sheet.dimension.changed$,
                this.emojiSheet.url.changed$,
                this.buttonSize.changed$,
                this.emojiSheet.config.parameters.sheet.use.changed$
            )
        ).subscribe(([resolution, margin, dimension, url, buttonSize, use]) => {
            // if we want 25px and resolution of emojiSheet is 32px we take 25.
            // if we want 25px and resoltion of emojiSheet is 16px we take 16px for not deteriorating
            const style = (emoji: EmojiData, forcedNotSheet = false) => {
                const noSheetStyle = {
                    'margin.px': margin.value,
                    'width.px': buttonSize.value,
                    'height.px': buttonSize.value
                };

                if (!use.value || forcedNotSheet) {
                    if (!use.value) {
                        const size = (emoji.nbZeroWidthJoiner /* nbZeroWidthJoiner */ + 1) * buttonSize.value;
                        noSheetStyle['width.px'] = size;
                    }

                    return noSheetStyle;
                }


                const justSheetStyle = {
                    'backgroundSize.px': dimension.value.width * buttonSize.value / (resolution.value + margin.value),
                    backgroundImage: `url(${url.value})`,
                    'backgroundPositionX.px': -emoji.sheetX * buttonSize.value,
                    'backgroundPositionY.px': -emoji.sheetY * buttonSize.value,
                };

                return Object.assign(noSheetStyle, justSheetStyle);
            };

            this._buttonStyle.$(style);
        });
    }



    get buttonWidth() {
        return this._buttonWidth;
    }

    /* get buttonsVariationsWidth() {
        return this._buttonVariationsWidth;
    } */

    get buttonSize() {
        return this._buttonSize;
    }

    get buttonStyle() {
        return this._buttonStyle;
    }


    // buttons

    createNumberEmojisPerLine() {
        this._numberEmojisPerLine = ProxyObserver.create();

        this.buttonWidth.changed$.pipe(
            combineLatest(
                this.config.content.width.changed$,
                this.config.content.list.padding.changed$)
        ).subscribe(([buttonWidth, contentWidth, listPadding]) => {
            const scrollbar = this.platform.is('core') ? 12 : 0;
            const listWidth = contentWidth.value - 2 * listPadding.value - scrollbar;

            const nb = Math.floor(listWidth / buttonWidth.value);

            this._numberEmojisPerLine.$(nb);
        });
    }

    createNumberEmojisContent() {
        this._numberEmojisContent = ProxyObserver.create();

        this.numberEmojisPerLine.changed$.pipe(
            combineLatest(
                this.buttonWidth.changed$,
                this.config.content.height.changed$
            )
        ).subscribe(([numberEmojisPerLine, buttonWidth, contentHeight]) => {
            const nbPerLine = numberEmojisPerLine.value;
            const nbPerColumn = Math.floor(contentHeight.value / buttonWidth.value);
            const nb = nbPerLine * nbPerColumn;

            this._numberEmojisContent.$(nb);
        });
    }


    createButtonsWidth() {
        this._buttonsWidth = ProxyObserver.create();

        this.buttonWidth.changed$.pipe(
            combineLatest(this.numberEmojisPerLine.changed$)
        ).subscribe(([buttonWidth, numberEmojisPerLine]) => {
            // if we want 25px and resolution of emojiSheet is 32px we take 25.
            // if we want 25px and resoltion of emojiSheet is 16px we take 16px for not deteriorating

            const width = buttonWidth.value * numberEmojisPerLine.value;
            this._buttonsWidth.$(width);
        });
    }

    get numberEmojisPerLine() {
        return this._numberEmojisPerLine;
    }

    get numberEmojisContent() {
        return this._numberEmojisContent;
    }


    get buttonsWidth() {
        return this._buttonsWidth;
    }


}
