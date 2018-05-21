import { Injectable } from '@angular/core';

import { EmojiSheet } from '@services/sheet/emoji-sheet.service';
import { Dimension } from '@model/dimension/dimension';
import { EmojiData } from '@model/emoji/emoji-data';
import { Util } from '@util/util';

import { ProxyObserver, ProxyTypeObserver } from '@proxy';
import { Platform } from 'ionic-angular';


export class Content {
    width: number = undefined; // to be set by the app
    height: number = undefined; // to be set by the app
    list?: List = new List(this);
}


export class List {
    padding: number = undefined; // to be set by the app
    buttons = new Buttons(this);

    constructor(public content?: Content) { }
}




export class Buttons {
    button = new Button();

    constructor(public list?: List) { }

    private buttonWidth() {
        return this.button.size + 2 * this.button.margin;
    }

    public numberEmojisPerLine() {
        const scrollbar = Css.platform.is('core') ? 12 : 0;
        const listWidth = this.list.content.width - 2 * this.list.padding - scrollbar;
        return Math.floor(listWidth / this.buttonWidth());
    }

    public numberEmojisContent() {
        const nbPerLine = this.numberEmojisPerLine();
        const nbPerColumn = Math.floor(this.list.content.height / this.buttonWidth());
        return nbPerLine * nbPerColumn;
    }

    public width() {
        return this.buttonWidth() * this.numberEmojisPerLine();
    }
}



export class Button {
    margin: number = undefined; // to be set by the app
    sizeRequired: number = undefined; // to be set by the config
    private resolution: number = undefined; // = Css.emojiSheet.config.parameters.resolution.$$; // to be set by the config
    private sheetMargin: number = undefined; // = Css.emojiSheet.config.parameters.sheet.margin.$$; // to be set by the config
    private sheetDimension: Dimension = undefined; // = Css.emojiSheet.config.parameters.sheet.dimension.$$; // to be set by the config

    constructor() {
        const parameters = Css.emojiSheet.config.parameters;

        parameters.resolution.changed$.subscribe(({ prop, value }) => {
            this.resolution = value;
        });

        parameters.sheet.margin.changed$.subscribe(({ prop, value }) => {
            this.sheetMargin = value;
        });

        parameters.sheet.dimension.changed$.subscribe(({ prop, value }) => {
            this.sheetDimension = value;
        });

        /*      Css.emojiSheet.sheet$.subscribe(newValue => {
                 const sheetMargin = newValue.changed.find(param => param === 'margin');

                 if (sheetMargin)
                     this.sheetMargin = newValue.sheet.margin;


                 const sheetDimension = newValue.changed.find(param => param === 'dimension');

                 if (sheetDimension)
                     this.sheetDimension = newValue.sheet.dimension;
             }); */
    }
    /* constructor(emojiSheet: EmojiSheet) {
        emojiSheet.parameters$.subscribe(newValue => {
            const newResolution = newValue.changed.find(param => param === 'resolution');

            if (newResolution)
                this.resolution = newValue.parameters.resolution;
        });
    } */

    get size() {
        // if we want 25px and resolution of emojiSheet is 32px we take 25.
        // if we want 25px and resoltion of emojiSheet is 16px we take 16px for not deteriorating
        return Math.min(this.sizeRequired, this.resolution);
    }

    style(emoji: EmojiData) {
        return {
            'backgroundSize.px': this.sheetDimension.width * this.size / (this.resolution + this.sheetMargin),
            backgroundImage: `url(${Css.emojiSheet.url})`,
            'backgroundPositionX.px': -emoji.sheetX * (this.size),
            'backgroundPositionY.px': -emoji.sheetY * (this.size),
            'margin.px': this.margin
        };
    }

}





@Injectable()
export class Css {
    config: { content: ProxyTypeObserver<Content> };
    static emojiSheet: EmojiSheet;
    static platform: Platform;


    constructor(emojiSheet: EmojiSheet, platform: Platform) {
        Css.emojiSheet = emojiSheet;
        Css.platform = platform;

        this.config = ProxyObserver.create({ content: new Content() });
    }


    /*  setContent(dimension: Dimension) {
         Util.assignRecursive(this._content, dimension);
         // this.dimensions$.next(dimension);
     }

    get content() {
        return this._content;
    } */
}
