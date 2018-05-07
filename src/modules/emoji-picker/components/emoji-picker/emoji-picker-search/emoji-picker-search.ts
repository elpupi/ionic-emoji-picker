import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs/Subject';
// import "rxjs/add/operator/throttleTime";
// import "rxjs/add/operator/takeUntil";
import { takeUntil, debounceTime, debounce, distinctUntilChanged } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';




@Component({
    selector: 'mt-emoji-picker-search',
    templateUrl: 'emoji-picker-search.html'
})
export class EmojiPickerSearch {
    @Input('mtInputAutofocus') inputAutofocus: boolean;
    @Output('mtSearch') searchEmitter: EventEmitter<string> = new EventEmitter();
    @ViewChild('input') input: ElementRef;
    @Input('mtDisabled') disabled: boolean;

    private searchValue: Subject<string> = new Subject();
    private destroyed = new Subject<boolean>();


    constructor(private renderer: Renderer2) {
        this.searchValue.pipe(
            takeUntil(this.destroyed),
            // debounceTime(500),
            debounce(text => {
                if (text === '')
                    return timer(0);

                return timer(500);
            }),
            distinctUntilChanged()
        )
            .subscribe(text => this.searchEmitter.emit(text));
    }

    ngAfterViewInit() {
        if (this.inputAutofocus) {
            const input = this.renderer.selectRootElement(this.input);
            input.nativeElement.focus();
        }
    }

    handleInputChange(text: string) {
        this.searchValue.next(text);
    }

    ngOnDestroy() {
        this.destroyed.next(true);
    }
}
