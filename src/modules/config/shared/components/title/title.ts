import { Component, QueryList, Input, HostBinding, Directive, ElementRef, Renderer2 } from '@angular/core';



type Attribute = 'light' | 'normal' | 'strong';


// tslint:disable:quotemark
@Component({
    selector: 'mt-title',
    templateUrl: 'title.html',
})
// tslint:enable:quotemark
export class Title {
    @Input('mtIconName') iconName: string;

    static lightAttribute = ['mt-light-title', 'mt-light'];
    static normalAttribute = ['mt-normal-title', 'mt-normal'];
    static strongAttribute = ['mt-strong-title', 'mt-strong'];


    static attibuteSeletor(attribute: Attribute) {
        const attr = Title[attribute + 'Attribute'] as string[];

        return attr.map(a => `[${a}]`).join(',');
    }


    constructor(private elementRef: ElementRef, private render: Renderer2) { }

    ngOnInit() {
        this.setClass();
    }

    private setClass() {
        let title = this.elementRef.nativeElement as HTMLElement;

        // go up to find the first directive
        let found: Attribute;
        while (title !== undefined && title !== null) {
            found = this.hasAttribute(title);

            if (found !== undefined) {
                const className = found.split('-')[1];
                this.render.addClass(this.elementRef.nativeElement, className);
                return;
            }

            title = title.parentElement;
        }

        this.render.addClass(this.elementRef.nativeElement, 'normal'); // default

    }


    private hasAttribute(element: HTMLElement): Attribute {
        const attributes = [...Title.lightAttribute, ...Title.normalAttribute, ...Title.strongAttribute];

        for (const attr of attributes) {
            if (element.attributes[attr] !== undefined)
                return attr as Attribute;
        }

        return undefined;
    }

}



/* @Directive({
    selector: Title.attibuteSeletor('light') // '[mt-light-title], [mt-light]',
})
export class LightTitle { }

@Directive({
    selector: Title.attibuteSeletor('normal')  // '[mt-normal-title], [mt-normal]',
})
export class NormalTitle { }

@Directive({
    selector: Title.attibuteSeletor('strong')  // '[mt-strong-title], [mt-strong]',
})
export class StrongTitle { }
 */
