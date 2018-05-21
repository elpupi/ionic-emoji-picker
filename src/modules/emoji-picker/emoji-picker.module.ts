import { NgModule, ModuleWithProviders, FactoryProvider } from '@angular/core';
import { IonicModule } from 'ionic-angular';
// import { HttpClientModule } from '@angular/common/http';
// import { HTTP } from '@ionic-native/http';
// Mine
import { CoreModule } from '@modules/core/core.module';

import { EmojiPicker } from '@components/emoji-picker/emoji-picker';
import { EmojiPickerContent } from '@components/emoji-picker/emoji-picker-content/emoji-picker-content';
import { EmojiPickerList } from '@components/emoji-picker/emoji-picker-list/emoji-picker-list';
import { EmojiPickerHeader } from '@components/emoji-picker/emoji-picker-header/emoji-picker-header';
import { EmojiPickerFooter } from '@components/emoji-picker/emoji-picker-footer/emoji-picker-footer';
import { EmojiPickerButton } from '@components/emoji-picker/emoji-picker-button/emoji-picker-button';
// import { EmojiPickerIcon } from '@components/emoji-picker/emoji-picker-icon/emoji-picker-icon';
import { EmojiPickerSearch } from '@components/emoji-picker/emoji-picker-search/emoji-picker-search';
import { EmojiPickerCategories } from '@components/emoji-picker/emoji-picker-categories/emoji-picker-categories';
import { EmojiPickerCategory } from '@components/emoji-picker/emoji-picker-category/emoji-picker-category';

import { EmojiEmptyCategoryPipe } from '@pipes/emoji-empty-category.pipe';
import { CodeToUnicodePipe } from '@pipes/code-to-unicode.pipe';

import { EmojiPickerCaretDirective } from './directives/emoji-picker-caret.directive';


import { EmojiSheet } from '@services/sheet/emoji-sheet.service';
import { EmojiSheetConfig } from '@services/sheet/emoji-sheet-config.service';
import { EmojiOption } from '@services/emoji/emoji-option.service';
import { EmojiJsonConfig } from '@services/emoji/emoji-json-config.service';
import { EmojiRequest } from '@services/emoji/emoji-request.service';
import { Emoji } from '@services/emoji/emoji.service';
import { Category } from '@services/category/category.service';
import { CategoryConfig } from '@services/category/category-config.service';
import { CssConfig } from '@services/css/css-config.service';
import { Css } from '@services/css/css.service';

// import { CommonModule } from '@angular/common';

const componentsToExport = [
    EmojiPicker,
    EmojiPickerContent,
    EmojiPickerList,
    EmojiPickerHeader,
    EmojiPickerFooter,
    EmojiPickerButton,
    // EmojiPickerIcon,
    EmojiPickerSearch,
    EmojiPickerCategories,
    EmojiPickerCategory,
];



@NgModule({
    declarations: [
        // components
        ...componentsToExport,
        // directive
        EmojiPickerCaretDirective,
        // private pipe for this module
        EmojiEmptyCategoryPipe,
        CodeToUnicodePipe
    ],
    imports: [
        IonicModule,
        // CommonModule,
        CoreModule,
        // HttpClientModule,
    ],
    exports: [
        ...componentsToExport,
        // directive
        EmojiPickerCaretDirective
    ]
})
export class EmojiPickerModule {
    static providers = [
        Category,
        EmojiSheet,
        EmojiOption,
        EmojiRequest,
        Emoji,
        CssConfig,
        Css,
        CodeToUnicodePipe
    ];

    static forRoot(config?: EmojiPickerConfig): ModuleWithProviders { // for lazy modules using the service of this module

        return {
            ngModule: EmojiPickerModule,
            providers: [
                ...EmojiPickerModule.providers,
                { provide: EmojiJsonConfig, useValue: new EmojiJsonConfig(config.emojiJsonConfig) },
                { provide: EmojiSheetConfig, useValue: new EmojiSheetConfig(config.emojiSheetConfig) },
                { provide: CategoryConfig, useValue: new CategoryConfig(config.categoryConfig) },
            ]
        };

    }

}

export interface EmojiPickerConfig {
    emojiSheetConfig?: EmojiSheetConfig;
    emojiJsonConfig?: EmojiJsonConfig;
    categoryConfig?: CategoryConfig;
}
