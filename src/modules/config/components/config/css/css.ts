import { Component } from '@angular/core';

import { ConfigParameters } from '@modules/config/services/config-parameters.service';
import { ModelFactory } from '@modules/config/services/model-factory.service';

import { CssConfig } from '@config/model/config-data';

import { ProxyTypeObserver } from '@proxy';

@Component({
    selector: 'mt-css',
    templateUrl: 'css.html'
})
export class Css {


    css: ProxyTypeObserver<CssConfig>;

    constructor(configParameters: ConfigParameters, private modelFactory: ModelFactory) {
        this.css = configParameters.config.css;
    }

}
