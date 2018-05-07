/* import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmojiPickerOptions } from '../../../services/emoji-picker-options.service';
import { EmojiEvent } from '../../../lib/emoji-event';


@Component({
  selector: 'mt-emoji-picker-icon',
  templateUrl: 'emoji-picker-icon.html'
})
export class EmojiPickerIcon {

  @Input('mtEmoji') emoji;
  @Input('mtDataToEmit') dataToEmit;
  @Input('mtOptions') options;
  @Input('mtFitzpatrick') fitzpatrick;

  @Output('mtSelection') selectionEmitter: EventEmitter<any> = new EventEmitter();

  constructor(public emojiPickerOptions: EmojiPickerOptions) { }

  public buttonClikedHandler() {
    // this._emojiPickerRef.instance.selectionEmitter.subscribe(event => this.selectEmitter.emit(EmojiEvent.fromArray(event)))
    // this.selectionEmitter.emit(this.dataToEmit || this.emoji);
    const event = this.dataToEmit || this.emoji;
    this.selectionEmitter.emit(EmojiEvent.fromArray(event));
  }
}
 */
