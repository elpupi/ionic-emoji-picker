import { Component, Input } from '@angular/core';
import { Model } from '@modules/config/services/model-factory.service';
@Component({
    selector: 'mt-segment',
    templateUrl: 'segment.html'
})
export class Segment {
    @Input() model: Model<number>;
    @Input() segments: any[] = [];


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
