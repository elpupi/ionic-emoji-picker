import { NgModule } from '@angular/core';

// shared module
import { SharedModule } from '../../../shared/shared.module';


// sheet
import { Sheet } from './sheet';

import { Margin } from './margin/margin';
import { Resolution } from './resolution/resolution';
import { Type } from './type/type';
import { Use } from './use/use';


const exportedComponents = [
    Sheet,
    Margin,
    Resolution,
    Type,
    Use,
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
export class SheetModule { }
