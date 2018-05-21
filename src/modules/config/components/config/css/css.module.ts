import { NgModule } from '@angular/core';

// shared module
import { SharedModule } from '../../../shared/shared.module';

// css
import { Css } from './css';



const exportedComponents = [
    Css,
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
export class CssModule { }
