import { NgModule } from '@angular/core';

// shared module
import { SharedModule } from '../../../shared/shared.module';


// sheet
import { Sheet } from './sheet';




const exportedComponents = [
    Sheet
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
