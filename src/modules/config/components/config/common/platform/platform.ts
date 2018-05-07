import { Component, EventEmitter, Output } from '@angular/core';
import { Platform as EmojiPlatform, PlatformString } from '@model/platform';
import { ConfigParameters } from '@config/services/config-parameters.service';


@Component({
    selector: 'platform',
    templateUrl: 'platform.html'
})
export class Platform {

    public platforms = Object.keys(new EmojiPlatform());
    public platform: PlatformString;

    constructor(private configParameters: ConfigParameters) { }

    ngOnInit() {
        this.configParameters.config.emoji.parameters.platform.changed$.subscribe(({ prop, value }) => this.platform = value);
    }

    public changed() {
        this.configParameters.config.emoji.parameters.platform = this.platform;
    }

}
