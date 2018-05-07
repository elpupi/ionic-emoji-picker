import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HttpModule } from './http/http.module';
import { FastDom } from './fastdom/fastdom';


@NgModule({
    imports: [
        HttpModule,
        CommonModule
    ],
    declarations: [],
    exports: [
        HttpModule,
        CommonModule
    ],
    providers: [
        FastDom
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
