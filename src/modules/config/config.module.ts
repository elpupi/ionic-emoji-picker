import { NgModule } from '@angular/core';

// shared module
import { SharedModule } from './shared/shared.module';

import { CssModule } from './components/config/css/css.module';
import { JsonModule } from './components/config/json/json.module';
import { SheetModule } from './components/config/sheet/sheet.module';


// config
import { Config } from './components/config/config';


// services

import { QuestionMessage } from './services/question-message.service';
import { ConfigParameters } from './services/config-parameters.service';


@NgModule({
    declarations: [
        Config
    ],
    imports: [
        SharedModule,
        CssModule,
        JsonModule,
        SheetModule
    ],
    exports: [
        Config,
    ],
    providers: [
        //    QuestionMessage
        ConfigParameters
    ]
})
export class ConfigModule { }
