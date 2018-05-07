import { Component } from '@angular/core';
import { ConfigParameters } from '@config/services/config-parameters.service';
import { Mode } from '@services/emoji/emoji-json-config.service';


@Component({
    selector: 'sheet',
    templateUrl: 'sheet.html'
})
export class Sheet {

    use: boolean;
    // mode: Mode;

    constructor(configParameters: ConfigParameters) {
        configParameters.config.sheet.parameters.sheet.use.changed$.subscribe(({ prop, value }) => this.use = value);
        /*  configParameters.config.emoji.mode.changed$.subscribe(({ prop, value }) => {
             this.mode = value;
         }); */

    }
}
