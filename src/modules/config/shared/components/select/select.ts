import { Component, Input } from '@angular/core';
import { Model } from '@modules/config/services/model-factory.service';

@Component({
    selector: 'mt-select',
    templateUrl: 'select.html'
})
export class Select {

    @Input() model: Model<any>;
    @Input() options: any[] = [];

    constructor() { }

    modelChanged(value: string) {
        let v = value as any;

        if (parseFloat(value) + '' === value) {
            // it's a number
            v = parseFloat(value);
        }

        this.model.modelChange(v);
    }
}
