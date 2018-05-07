import { Component } from '@angular/core';
import { ConfigParameters } from '@config/services/config-parameters.service';


@Component({
    selector: 'use',
    templateUrl: 'use.html'
})
export class Use {

    _mode: 'unicode' | 'sheet';
    public modes = ['unicode', 'sheet'];

    constructor(private configParameters: ConfigParameters) { }


    ngOnInit() {
        this.configParameters.config.sheet.parameters.sheet.use.changed$.subscribe(({ prop, value }) => {
            this._mode = value === true ? 'sheet' : 'unicode';
        });
    }



    set mode(mode: 'unicode' | 'sheet') {
        this.configParameters.config.sheet.parameters.sheet.use = mode === 'sheet'; // _mode is changed in the subscriber
    }

    get mode() {
        return this._mode;
    }

}
