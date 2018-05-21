import { NgModule } from '@angular/core';

// shared module
import { SharedModule } from '../../../shared/shared.module';

// json
import { Json } from './json';



const exportedComponents = [
    Json
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
