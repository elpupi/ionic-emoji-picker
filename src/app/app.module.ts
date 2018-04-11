import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// import { HttpClientModule } from '@angular/common/http';

// Mine
// import { CoreModule } from '../modules/core/core.module';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { EmojiPickerModule, EmojiPickerConfig } from '@modules/emoji-pciker/emoji-picker.module';
import { EmojiOptionConfig } from '@services/emoji/emoji-option-config.service';
import { EmojiOption } from '@services/emoji/emoji-option.service';

/* const EmojisURLProvider = {
    provide: EmojiURL,
    useFactory: () => new EmojiURL(EmojiURL.generateURL`assets/emojis-${'platform'}.json`, { platform: 'apple' }),
    deps: []
};
 */
@NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        BrowserModule,
        // CoreModule,
        IonicModule.forRoot(MyApp),
        EmojiPickerModule.forRoot({
            emojiSheetConfig: {
                url: 'assets/sprite/apple/sheets/32.png',
                sheet: true
            },
            emojiURLConfig: {
                online: {
                    urlGenerator: EmojiOption.generateURL`assets/json/emojis-${'platform'}.json`,
                    parameters: { platform: 'apple' }
                }
            }
        } as EmojiPickerConfig)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
    ]
})
export class AppModule { }
