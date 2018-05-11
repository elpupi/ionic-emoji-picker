import { NgModule } from '@angular/core';

// shared module
import { SharedModule } from '../../../shared/shared.module';

// json
import { Json } from './json';

import { Mode } from './mode/mode';


const exportedComponents = [
    Json,
    Mode,
];

@NgModule({
    declarations: [
        ...exportedComponents
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ...exportedComponents
    ],
    providers: []
})
export class JsonModule { }
