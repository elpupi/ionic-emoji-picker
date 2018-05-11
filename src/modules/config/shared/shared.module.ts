import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';



// components
import { Platform } from './components/platform/platform';
import { Dimension } from './components/dimension/dimension';

// import { Segment, SegmentButton } from './components/segment/segment';
import { Question, QuestionElement } from './components/question/question';
import { Title } from './components/title/title';
import { Category, CategoryElement } from './components/category/category';


// directives

import { Input } from './directives/input/input.directive';
import { Config } from './directives/config/config.directive';


const exportedComponentsAndDirectives = [
    // common components
    Platform,
    Dimension,


    // tools
    // Segment,
    // SegmentButton,
    Question,
    QuestionElement,
    Title,
    Category,
    CategoryElement,

    // directives
    Config,
    Input,
];


@NgModule({
    declarations: [
        ...exportedComponentsAndDirectives
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        ...exportedComponentsAndDirectives,
        IonicModule,
        CommonModule
    ],
    providers: []
})
export class SharedModule { }
