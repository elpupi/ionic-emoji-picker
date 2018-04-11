/* import { Directive, Input, ComponentFactoryResolver, ViewContainerRef, ComponentFactory, ComponentRef, ElementRef, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/distinctUntilChanged';

import { EmojiPicker } from '../components/emoji-picker/emoji-picker';
import { Subscription } from 'rxjs/Subscription';
import { EmojiEvent } from '../lib/emoji-event';

@Directive({
  selector: '[mtEmojiPickerIf]',
  host: {
    '(mousedown)': '$event.emojiPickerExempt = true' // marking off event listening on anchor
  }
})
export class EmojiPickerApiDirective {
  private _directionCode: DIRECTIONS = DIRECTIONS.bottom;


  // [emojiPickerPreserveSelection]="true || false" preserves or forgets prexisting selection while toggling picker
  @Input('mtEmojiPickerPreserveSelection') emojiPickerPreserveSelection: boolean;

  @Output('mtEmojiPickerIfChange') emojiPickerIfEmitter = new EventEmitter<boolean>();

  // (emojiPickerSelect)="eventHandler($event)" // emits emoji picking event
  @Output('mtEmojiPickerSelect') selectEmitter = new EventEmitter();

  // [emojiPickerAutofocus]="true || false"
  @Input('mtEmojiPickerAutofocus') emojiPickerAutofocus: boolean;


  private emojiPickerOpenState = new Subject<boolean>();
  private destroyed = new Subject<boolean>();

  private emojiPickerFactory: ComponentFactory<EmojiPickerComponent>;
  private emojiPickerRef: ComponentRef<EmojiPickerComponent>;
  private emojiSubs: Subscription[] = [];

  private recordedSelection;


  constructor(
    private containerFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private elementRef: ElementRef) {

    this.emojiPickerOpenState
      .takeUntil(this.destroyed)
      .distinctUntilChanged()
      .subscribe(value => {
        if (value) {
          this.openPicker();
        } else {
          this.closePicker();
        }
      });
  }

  openPicker() {
    this.emojiPickerFactory = this.emojiPickerFactory || this.containerFactoryResolver.resolveComponentFactory(EmojiPickerComponent);
    this.emojiPickerRef = this.emojiPickerRef || this.viewContainer.createComponent(this.emojiPickerFactory);

    this.recordSelection();

    this.emojiPickerRef.instance.setPosition(this.elementRef, this._directionCode);
    this.emojiPickerRef.instance.setAutofocus(this.emojiPickerAutofocus);
    this.emojiSubs.push(
      this.emojiPickerRef.instance.pickerCloseEmitter.subscribe(event => this.emojiPickerIfEmitter.emit(false)),
      this.emojiPickerRef.instance.selectionEmitter.subscribe(event => this.selectEmitter.emit(EmojiEvent.fromArray(event)))
    );

    this.restoreSelection();
  }

  closePicker() {
    if (!this.emojiPickerRef || !this.emojiPickerRef.destroy) {
      return;
    }

    this.emojiSubs.forEach((subscription: Subscription) => subscription.unsubscribe());
    this.emojiPickerRef.destroy();

    this.emojiSubs = [];
    delete this.emojiPickerRef;
  }

  recordSelection() {
    if (!this.emojiPickerPreserveSelection) {
      return;
    }

    if (window.getSelection) {
      let sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        return this.recordedSelection = sel.getRangeAt(0);
      }
    } else if (document['selection'] && document['selection'].createRange) {
      return this.recordedSelection = document['selection'].createRange();
    }
  }

  restoreSelection() {
    if (!this.emojiPickerPreserveSelection || !this.recordedSelection) {
      return;
    }

    if (window.getSelection) {
      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(this.recordedSelection);
    } else if (document['selection'] && this.recordedSelection.select) {
      this.recordedSelection.select();
    }
  }

  ngOnDestroy() {
    this.destroyed.next(true);
  }
}
 */
