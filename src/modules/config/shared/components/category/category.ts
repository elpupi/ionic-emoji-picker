import { Component, Input, Directive } from '@angular/core';


@Directive({ selector: '[mt-category-element]' })
export class CategoryElement { }


@Component({
    selector: 'mt-category',
    templateUrl: 'category.html'
})
export class Category {


    @Input('mtIconName') iconName: string;
    @Input('mtTitle') title: string;



    constructor() { }

}
