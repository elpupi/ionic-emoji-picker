import { Component, ContentChildren, QueryList, Directive, Renderer2, ElementRef, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';


@Directive({ selector: '[mt-segment-button]' })
export class SegmentButton {
    @HostBinding('class.isActivated') activated: boolean;

    @Input('value') value: string;
    clicked$ = new EventEmitter<string>();

    /*    @HostListener('click') onClick() {
            this.activated.next(this.value);
        }
     */

    @HostListener('click') onClick() {
        this.clicked$.next(this.value);
    }

}


@Component({
    selector: 'mt-segment',
    templateUrl: 'segment.html'
})
export class Segment {
    private _model: string;
    @Output('modelChange') modelChange = new EventEmitter<string>();

    @ContentChildren(SegmentButton) buttons: QueryList<SegmentButton>;
    @ContentChildren(SegmentButton, { read: ElementRef }) buttonsRef: QueryList<ElementRef>;


    constructor(private render: Renderer2) { }

    @Input('model') set model(model: string) {
        this._model = model;

        this.updateButtonActivated();
    }

    get model() {
        return this._model;
    }

    ngAfterContentInit() {
        this.buttons.forEach(button => {
            button.clicked$.subscribe(this.clicked.bind(this));
        });

        /* this.buttonsRef.forEach(button => {
            this.addButtonStyle(button);
        }); */
    }

    /* addButtonStyle(button: ElementRef) {
        this.render.addClass(button.nativeElement, 'segment__button');
    } */

    clicked(value: string) {
        // outside when button clicked
        this.modelChange.next(value);

        this.updateButtonActivated();
    }


    private updateButtonActivated() {
        if (this.buttons) {
            this.buttons.forEach(button => {
                button.activated = this.model === button.value;
            });
        }
    }
}
