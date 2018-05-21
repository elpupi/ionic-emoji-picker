import { Component, ViewChildren, Input, Output, QueryList, EventEmitter, ViewChild, ElementRef, HostBinding } from '@angular/core';

import { FastDom } from '@modules/core/fastdom/fastdom';
import { Css } from '@services/css/css.service';

import { EmojiPickerCategory } from '@components/emoji-picker/emoji-picker-category/emoji-picker-category';
// import { ByCategory } from '@model/emoji/collections';
import { EmojiData } from '@model/emoji/emoji-data';
import { Categories, Category } from '@model/category/category';
import { EmojiCollections } from '@model/emoji/emoji-collections';
import { ByCategory } from '@model/emoji/collections';
import { Dimension } from '@model/dimension/dimension';
import { EmojiPickerButton } from '@components/emoji-picker/emoji-picker-button/emoji-picker-button';
import { EmojiSheet } from '@services/sheet/emoji-sheet.service';
import { Subscription } from 'rxjs';





@Component({
    selector: 'mt-emoji-picker-list',
    templateUrl: 'emoji-picker-list.html'
})
export class EmojiPickerList {
    @ViewChildren(EmojiPickerCategory) emojiCategory: QueryList<EmojiPickerCategory>;
    @ViewChildren(EmojiPickerButton, { read: ElementRef }) emojiButton: QueryList<EmojiPickerButton>;
    @ViewChild('list') listDiv: ElementRef;

    private _emojisByCategory: ByCategory;
    private _categories: Categories;
    public filteredCategories: Categories;

    @Output('mtEmojiSelection') emojiSelectionEmitter = new EventEmitter<EmojiData>();

    //  @Input('mtWidth') _width: number;
    /*  public width: number;

     private _dimension: Dimension;
     public buttonWidth: number = 25 + 2 + 2; // padding
     public marginButton = 2; */

    public buttonsWidth: number;

    public isSkeleton: boolean = true;

    /* private padding = 10; */
    @HostBinding('style.padding.px') paddingLeftRight: string; // = '0 10';

    constructor(private css: Css, private emojiSheet: EmojiSheet, private fastdom: FastDom) {
        this.css.config.content.list.padding = 10;
        this.css.config.content.list.padding.changed$.subscribe(({ prop, value }) => this.paddingLeftRight = `0 ${value}`);
        this.css.config.content.list.buttons.button.margin = 2;
        // this.buttonsWidth = this.css.config.content.list.buttons.$$.width();
        this.css.buttonsWidth.changed$.subscribe(({ prop, value }) => {
            this.buttonsWidth = value;
        });
    }

    ngOnInit() {
    }

    /*    private computeButtonsWidth() {
           return this.buttonWidth * this.numberEmojisLine();
       }

       private numberEmojisLine() {
           const listWidth = this.dimension.width - 2 * this.padding - 12 ; //scrollbar
           const buttonWidth = this.buttonWidth;

           return Math.floor(listWidth / buttonWidth);
       }

       private numberSkeletonEmojis() {
           const width = this.numberEmojisLine();
           const height = this.dimension.height / this.buttonWidth; // larger that list content size
           return Math.floor(width * height);
       }
    */

    /* @Input('mtDimension') set dimension(dimension: Dimension) {
        this._dimension = dimension;
        // this.buttonsWidth = this.computeButtonsWidth();
        //  this.buttonsWidth = this.css.content.list.buttons.width;
    }


    get dimension() {
        return this._dimension;
    } */



    @Input('mtEmojisCategories')
    set categories(categories: Categories) {
        // null bound means http and stuff not done
        if (!categories /* === null */ /* || 1 ===1 */) {
            this._categories = [{ category: 'skeleton' }] as any;
            this.filteredCategories = this._categories;
        } else {
            this._categories = categories;
            // categories is set at the beginning => so emojisByCategory is full and no need to call filterNonEmptyCategories
            this.filteredCategories = categories;
        }
    }

    get categories() {
        return this._categories;
    }


    @Input('mtEmojisByCategory')
    public set emojisByCategory(byCategory: ByCategory) {
        // null bound means http and stuff not done
        let skeletonSubscription: Subscription = undefined;

        if (!byCategory /* === null */ /* || 1 === 1 */) {

            skeletonSubscription = this.css.numberEmojisContent.changed$.subscribe(({ prop, value }) => {
                this._emojisByCategory = {
                    skeleton: Array(value).fill({ name: 'skeleton_emoji', unified: 'skeleton_emoji' })
                };
            });

            /*  this._emojisByCategory = {
                 skeleton: Array(this.css.config.content.list.buttons.$$.numberEmojisContent() // this.numberSkeletonEmojis()
                 ).fill({ name: 'skeleton_emoji', unified: 'skeleton_emoji' })
             } as any; */
        } else {
            if (skeletonSubscription !== undefined) skeletonSubscription.unsubscribe();

            this._emojisByCategory = byCategory;
            this.filterNonEmptyCategories();
            this.isSkeleton = false;
        }

    }

    public get emojisByCategory() {
        return this._emojisByCategory;
    }

    private filterNonEmptyCategories() {
        if (this.categories && this.emojisByCategory) {
            this.filteredCategories = this.categories.filter(c => {
                return Object.keys(this.emojisByCategory).find(category => c.category === category) !== undefined;
            });
        }
    }

    public selectCategory(category: Category) {
        this.emojiCategory.forEach((emojiCategory: EmojiPickerCategory) => {

            if (emojiCategory.category.category === category.category) {
                emojiCategory.scrollIntoView();
            }

        });
    }


    public emojiSelected(emoji: EmojiData) {
        this.emojiSelectionEmitter.emit(emoji);
    }

}





    /*    @Input('mtEmojisCategories')
       public set categories(categories: EmojiData[]) {
           const nonEmptyCategories: EmojiData[] = [];

           for (const emojiCategory of categories) {
            this.emojisByCategory[emojiCategory.category] !== undefined &&
            if (this.emojisByCategory[emojiCategory.category].length !== 0)
                   nonEmptyCategories.push(emojiCategory);
           }

           this._categories = nonEmptyCategories;
       }

       public get categories() {
           return this._categories;
       }
    */

    /* ngAfterViewInit2() {
        let first = true;
        this.emojiButton.changes.subscribe((buttons: QueryList<ElementRef>) => {
            if (buttons.length !== 0 && first) {
                // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
                // After 'verification digests'
                this.fastdom.measure(() =>
                    this.buttonsWidth2(this.listDiv.nativeElement, buttons.first.nativeElement)).then(
                    width => this.width = width);
                 Promise.resolve(null).then(() => {
                    this.width = this.buttonsWidth(this.listDiv.nativeElement, buttons.first.nativeElement);
                });
    setTimeout(() => {
        this.width = this.buttonsWidth(this.listDiv.nativeElement, buttons.first.nativeElement);
    }, 0);
first = false;
}
        });

if (this.isSkeleton && !this.filteredCategories && div !== undefined ) {
    SkeletonList.create(this.listDiv.nativeElement, this.fastdom).then(skeleton => {
        this.filteredCategories = skeleton.categories as any;
        this._emojisByCategory = skeleton.emojisByCategory;
    });

    this.fastdom.measure(() => {
        //  const a = this.numberEmojisSkeleton(div.nativeElement);
        return skeletonList.numberEmojisSkeleton(this.listDiv.nativeElement);
    }).then(number => {
        this.skeletonList = skeletonList;
    });
}
this.fastdom.measure(() => {
    this.skeletonList = Array(this.numberEmojisSkeleton()).fill(0);
});

    } */


    /* private buttonsWidth2(list: HTMLElement, button: HTMLElement) {
        const parseNumeric = (val: string) => parseFloat(val) || 0;

        const listWidth = list.clientWidth;
        const style = getComputedStyle(list);

        const buttonWidth = button.clientWidth;


        const paddingLeft = parseNumeric(style.paddingLeft);
        const paddingRight = parseNumeric(style.paddingRight);

        const nb = Math.floor((listWidth - paddingLeft - paddingRight) / buttonWidth);
        return buttonWidth * nb;
    } */
