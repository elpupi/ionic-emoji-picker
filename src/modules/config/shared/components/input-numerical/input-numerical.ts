import { Component, Input } from '@angular/core';
import { Model } from '@modules/config/services/model-factory.service';

@Component({
    selector: 'mt-input-numerical',
    templateUrl: 'input-numerical.html'
})
export class InputNumerical {

    @Input() min: number = 0;
    @Input() step: number = 1;
    @Input() model: Model<number>;
    @Input('mtTitle') title: string;


    constructor() { }

    modelChanged(value: string) {
        this.model.modelChange(parseInt(value, 10));
    }
}
