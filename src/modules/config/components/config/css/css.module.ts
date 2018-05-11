import { NgModule } from '@angular/core';

// shared module
import { SharedModule } from '../../../shared/shared.module';

// css
import { Css } from './css';

import { Button } from './button/button';


const exportedComponents = [
    Css,
    Button,
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
