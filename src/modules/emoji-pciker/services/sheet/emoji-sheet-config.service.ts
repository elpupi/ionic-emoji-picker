import { Injectable } from '@angular/core';


@Injectable()
export class EmojiSheetConfig {
    public url?: string = 'assets/sprite/apple/sheets/32.png';
    // locator: (iconName: string) => LocationPosition;
    public sheet?: boolean = false;

    constructor(config?: EmojiSheetConfig) {
        if (config !== undefined) Object.assign(this, config);

        if (this.url === '')
            this.sheet = false;
    }
}
