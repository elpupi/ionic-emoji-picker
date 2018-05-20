import { Component } from '@angular/core';
import { Mode } from '@services/emoji/emoji-json-config.service';
import { PlatformString } from '@model/platform';
import { ConfigParameters } from '@config/services/config-parameters.service';
import { ModelFactory } from '@modules/config/services/model-factory.service';


@Component({
    selector: 'json',
    templateUrl: 'json.html'
})
export class Json {

    mode: Mode;

    constructor(configParameters: ConfigParameters, private modelFactory: ModelFactory) {
        configParameters.config.emoji.mode.changed$.subscribe(({ prop, value }) => this.mode = value);
    }

}
