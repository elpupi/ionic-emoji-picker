import { Directive, Renderer2, ElementRef } from '@angular/core';



@Directive({
    selector: '[mt-input]'
})
export class Input {
    constructor(private elementRef: ElementRef, private render: Renderer2) {
    }
}
