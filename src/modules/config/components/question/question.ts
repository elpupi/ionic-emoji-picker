import { Component, ContentChildren, QueryList, Directive, Renderer2, ElementRef, Input, ViewChildren, ContentChild, Injectable } from '@angular/core';




@Directive({ selector: '[mt-question-element]' })
export class QuestionElement { }


@Component({
    selector: 'mt-question',
    templateUrl: 'question.html',
    // providers: [{ provide: QuestionChild, useClass: QuestionChild }]
})
export class Question {
    @Input('mtIconName') iconName: string;
    @Input('mtTitle') title: string;
    // @Output('mtSelected') selected = new EventEmitter();

    // @ContentChildren(QuestionElement, { read: ElementRef }) questionElements: QueryList<ElementRef>; // SegmentButton
    @ContentChildren(QuestionElement) questionElements: QueryList<ElementRef>;


    constructor(private render: Renderer2) { }

    ngAfterContentInit() {
        this.questionElements.forEach(elmt => this.handleSelection(elmt));
        // this.questionElements.forEach(elmt => this.addButtonStyle(elmt));
    }

    handleSelection(elmt: ElementRef) {
        // this.render.addClass(elmt.nativeElement, 'question__element');
    }
    /*  addButtonStyle(elmt: ElementRef) {
         this.render.addClass(elmt.nativeElement, 'question__element');
     } */
}
