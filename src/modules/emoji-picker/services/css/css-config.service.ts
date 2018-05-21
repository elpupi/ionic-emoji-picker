import { Injectable } from '@angular/core';

import { EmojiSheet } from '@services/sheet/emoji-sheet.service';
import { Dimension } from '@model/dimension/dimension';
import { EmojiData } from '@model/emoji/emoji-data';
import { Util } from '@util/util';

import { ProxyObserver, ProxyTypeObserver } from '@proxy';
import { Platform } from 'ionic-angular';


export class Content {
    width?: number = undefined;
    height?: number = undefined;
    list?: List = new List();
}


export class List {
    padding?: number = undefined;
    buttons?: Buttons = new Buttons();
}

export class Buttons {
    button = new Button();
}

export class Button {
    margin?: number = undefined;
    sizeRequired?: number = undefined;
}



export class CssConfig {
    content?: Content = new Content();
}


/*
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



    public numberEmojisPerLine() {
        const scrollbar = CssConfig2.platform.is('core') ? 12 : 0;
        const listWidth = this.list.content.width - 2 * this.list.padding - scrollbar;
        return Math.floor(listWidth / this.button.width);
    }

    public numberEmojisContent() {
        const nbPerLine = this.numberEmojisPerLine();
        const nbPerColumn = Math.floor(this.list.content.height / this.button.width);
        return nbPerLine * nbPerColumn;
    }

    public width() {
        return this.button.width * this.numberEmojisPerLine();
    }
}



export class Button {
    margin: number = undefined; // to be set by the app
    sizeRequired: number = undefined; // to be set by the config
    private resolution: number = undefined; // = Css.emojiSheet.config.parameters.resolution.$$; // to be set by the config
    private sheetMargin: number = undefined; // = Css.emojiSheet.config.parameters.sheet.margin.$$; // to be set by the config
    private sheetDimension: Dimension = undefined; // = Css.emojiSheet.config.parameters.sheet.dimension.$$; // to be set by the config
    private sheetUrl: string;

    constructor() {
        const parameters = CssConfig2.emojiSheet.config.parameters;

        parameters.resolution.changed$.subscribe(({ prop, value }) => {
            this.resolution = value;
        });

        parameters.sheet.margin.changed$.subscribe(({ prop, value }) => {
            this.sheetMargin = value;
        });

        parameters.sheet.dimension.changed$.subscribe(({ prop, value }) => {
            this.sheetDimension = value;
        });

    }

    get width() {
        return this.size + 2 * this.margin;
    }
    get size() {
        // if we want 25px and resolution of emojiSheet is 32px we take 25.
        // if we want 25px and resoltion of emojiSheet is 16px we take 16px for not deteriorating
        return Math.min(this.sizeRequired, this.resolution);
    }

    style(emoji: EmojiData) {
        return {
            'backgroundSize.px': this.sheetDimension.width * this.size / (this.resolution + this.sheetMargin),
            backgroundImage: `url(${CssConfig2.emojiSheet.url})`,
            'backgroundPositionX.px': -emoji.sheetX * (this.size),
            'backgroundPositionY.px': -emoji.sheetY * (this.size),
            'margin.px': this.margin
        };
    }

}





@Injectable()
export class CssConfig2 {
    config: { content: ProxyTypeObserver<Content> };
    static emojiSheet: EmojiSheet;
    static platform: Platform;


    constructor(emojiSheet: EmojiSheet, platform: Platform) {
        CssConfig2.emojiSheet = emojiSheet;
        CssConfig2.platform = platform;

        this.config = ProxyObserver.create({ content: new Content() });
    }

}*/
