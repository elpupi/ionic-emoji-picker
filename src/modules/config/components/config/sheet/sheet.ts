import { Component } from '@angular/core';
import { ConfigParameters } from '@config/services/config-parameters.service';
import { Mode } from '@services/emoji/emoji-json-config.service';
import { ModelFactory } from '@modules/config/services/model-factory.service';

import { ProxyTypeObserver } from '@proxy';
import { EmojiSheetConfig } from '@modules/emoji-picker/services/sheet/emoji-sheet-config.service';

import { Platform as EmojiPlatform } from '@model/platform';


@Component({
    selector: 'sheet',
    templateUrl: 'sheet.html'
})
export class Sheet {

    use: boolean;
    // mode: Mode;
    sheet: ProxyTypeObserver<EmojiSheetConfig>;
    unicodeSheet: ProxyTypeObserver<'unicode' | 'sheet'>;
    platforms = Object.keys(new EmojiPlatform());


    constructor(public configParameters: ConfigParameters, private modelFactory: ModelFactory) {
        this.sheet = configParameters.config.sheet;
        this.sheet.parameters.sheet.use.changed$.subscribe(({ prop, value }) => {
            this.use = value;
        });
        /*  configParameters.config.emoji.mode.changed$.subscribe(({ prop, value }) => {
             this.mode = value;
         }); */
        this.unicodeSheet = this.sheet.parameters.sheet.use.$map({
            fromTo: v => v ? 'sheet' : 'unicode',
            toFrom: (v: 'unicode' | 'sheet') => v === 'sheet' ? true : false
        });

    }

}
