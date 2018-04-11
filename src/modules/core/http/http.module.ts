import { NgModule, Optional, SkipSelf } from '@angular/core';

// angular
import { HttpClientModule } from '@angular/common/http';
// ionic
import { HTTP } from '@ionic-native/http';


import { Http } from './http';



@NgModule({
    imports: [
        HttpClientModule
    ],
    declarations: [],
    exports: [],
    providers: [
        HTTP, // ionic
        ...Http.provider() // mine
    ]
})
export class HttpModule {
}
