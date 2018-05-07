import { Component } from '@angular/core';
import { Mode as EmojiMode } from '@services/emoji/emoji-json-config.service.ts';
import { ConfigParameters } from '@config/services/config-parameters.service';


@Component({
    selector: 'mode',
    templateUrl: 'mode.html'
})
export class Mode {

    public _mode: EmojiMode;
    public modes: EmojiMode[] = ['online', 'offline'];


    constructor(private configParameters: ConfigParameters) { }

    ngOnInit() {
        this.configParameters.config.emoji.mode.changed$.subscribe(({ prop, value }) => this._mode = value);
    }


    set mode(mode: EmojiMode) {
        this.configParameters.config.emoji.mode = mode; // _mode is changed in the subscriber
    }

    get mode() {
        return this._mode;
    }

    /*  public clicked(mouseEvent: MouseEvent) {
         let target = mouseEvent.target as HTMLElement;
         while (!(target instanceof HTMLButtonElement))
             target = target.parentElement;

         this.mode = target.value as EmojiMode;
         this.configParameters.config.emoji.mode = target.value as EmojiMode;
     } */

}
