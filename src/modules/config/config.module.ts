import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from 'ionic-angular';

// config
import { Config } from './components/config/config';

// common
import { Platform } from './components/config/common/platform/platform';

// json
import { Json } from './components/config/json/json';

import { Mode } from './components/config/json/mode/mode';

// sheet
import { Sheet } from './components/config/sheet/sheet';

import { Dimension } from './components/config/sheet/dimension/dimension';
import { Margin } from './components/config/sheet/margin/margin';
import { Resolution } from './components/config/sheet/resolution/resolution';
import { Type } from './components/config/sheet/type/type';
import { Use } from './components/config/sheet/use/use';

// components

import { Segment, SegmentButton } from './components/segment/segment';
import { Question, QuestionElement } from './components/question/question';
import { Title,/*  LightTitle, NormalTitle, StrongTitle */ } from './components/title/title';
import { Category, CategoryElement } from './components/category/category';



// services

import { QuestionMessage } from './services/question-message.service';
import { ConfigParameters } from './services/config-parameters.service';

@NgModule({
    declarations: [
        Config,
        Platform,
        Json,
        Mode,
        Sheet,
        Dimension,
        Margin,
        Resolution,
        Type,
        Use,
        Segment,
        SegmentButton,
        Question,
        QuestionElement,
        Title,
        /*   LightTitle,
          NormalTitle,
          StrongTitle, */
        Category,
        CategoryElement
    ],
    imports: [
        IonicModule,
        CommonModule
        // CommonModule,
    ],
    exports: [
        Config,
    ],
    providers: [
        //    QuestionMessage
        ConfigParameters
    ]
})
export class ConfigModule {
}
