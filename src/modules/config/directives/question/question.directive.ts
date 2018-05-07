/* import { Directive, Renderer2, ElementRef } from '@angular/core';


@Directive({ selector: '[mt-questionCACA]' })
export class Question2 {

    constructor(private el: ElementRef, private render: Renderer2) {
        render.addClass(el.nativeElement, 'mt-question');

    }

    ngAfterContentInit() {
        const children = this.el.nativeElement.children as HTMLCollection;
        for (let i = 0; i < children.length; ++i) {
            this.render.addClass(children[i], 'questionZZZ');
        }
    }
}
 */
