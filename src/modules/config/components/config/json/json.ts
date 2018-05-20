import { Component } from '@angular/core';
import { Mode } from '@services/emoji/emoji-json-config.service';
import { Platform as EmojiPlatform } from '@model/platform';
import { ConfigParameters } from '@config/services/config-parameters.service';
import { ModelFactory } from '@modules/config/services/model-factory.service';

import { EmojiJsonConfig } from '@modules/emoji-picker/services/emoji/emoji-json-config.service';
import { ProxyTypeObserver } from '@proxy';


@Component({
    selector: 'json',
    templateUrl: 'json.html'
})
export class Json {

    mode: Mode;
    emoji: ProxyTypeObserver<EmojiJsonConfig>;
    platforms = Object.keys(new EmojiPlatform());

    constructor(configParameters: ConfigParameters, private modelFactory: ModelFactory) {
        this.emoji = configParameters.config.emoji;

        this.emoji.mode.changed$.subscribe(({ prop, value }) => this.mode = value);
    }

}
