import { Injectable } from '@angular/core';


import { EmojiData } from '@model/emoji/emoji-data';
import { EmojiCollections } from '@model/emoji/emoji-collections';
import { Collections, ByCategory } from '@model/emoji/collections';
import { SkeletonCollections } from '@model/emoji/skeleton-collections';

import { EmojiRequest } from '@services/emoji/emoji-request.service';
import { EmojiOption } from '@services/emoji/emoji-option.service';
import { Category } from '@services/category/category.service';
import { Categories } from '@model/category/category';
import { CategoryDefinition } from '@model/category/category-definition';
import { categoriesDefinition } from '@data/categories-definition';


import { ElementFactory } from '@json-object-parser/element-factory';
import { VisitorRecursive } from '@json-object-parser/definition';

import { ArrayOptionProperties, ArrayOption } from '@json-object-parser/array/array-option';
import { ObjectOptionProperties, ObjectOption } from '@json-object-parser/object/object-option';
import { LiteralOption } from '@json-object-parser/litral/literal-option';


import { Observable, Observer, of } from 'rxjs';
import { map, startWith, filter, mergeMap, tap } from 'rxjs/operators';


import * as camelCase from 'camelcase';


export interface LoadedCategories {
    loaded: boolean;
    categories: Categories | CategoryDefinition;
}



@Injectable()
export class Emoji {
    /* private emojis: { [category: string]: EmojiData };
    // private categories: Array<string>;
    private emojis2: Partial<EmojiData>[]; */
    // public emojis$: Observable<EmojiCollections>;


    private static extractionOption = {
        returnObject: EmojiCollections,
        mutate: {
            // tslint:disable-next-line:object-literal-shorthand
            visitor: function (key: string, value: any) {

                if (!(this instanceof LiteralOption)) {
                    for (const keyProp of Object.keys(value)) {
                        if (keyProp.includes('_')) {
                            const newKey = camelCase(keyProp);
                            value[newKey] = value[keyProp];

                            delete value[keyProp];
                        }
                    }

                    if (typeof value === 'string' && value.includes('_')) {
                        return camelCase(value);
                    }
                }


                return value;
            },
            recursive: true
        } as VisitorRecursive,

        object: {
            all: true,

            filter: (key: string, value: any) => {
                /* if (key === 'category')
                    return false; */

                return true;
            }
        } as ObjectOptionProperties
    } as ArrayOptionProperties;


    public emojis$: Observable<Collections>;
    public emojis: Collections;

    categories$: Observable<Categories>;
    categories: Categories;


    constructor(public emojisRequest: EmojiRequest, private emojiOption: EmojiOption, private category: Category) {
        this.getEmojis();
        this.emojis$.pipe(
            tap(emojis => { this.emojis = emojis; })
        );
        this.getCategories();
    }

    private getEmojis() {
        if (this.emojiOption.config.mode === 'offline') {
            this.emojis$ = of(this.emojiOption.top);
            return;
        }

        this.emojis$ = this.emojisRequest.get$().pipe(
            // startWith(emojiOption.top),
            map(json => {
                if (json === undefined) // http error
                    return this.emojiOption.top;

                this.emojis = this.createEmojis(json);
                return this.emojis;
            }),
            // startWith(new SkeletonCollections())
        );
    }

    public getCategories() {
        this.categories$ = this.emojis$.pipe(
            map(data => {
                this.categories = this.category.categories(data);
                /*  = {
                    loaded: true,
                    categories: this.category.categories(data)
                }; */

                return this.categories;
            }),
            /*  startWith(function () {
                 this.categories = {
                     loaded: false,
                     categories: categoriesDefinition as Categories // startWith wants the same as the exit of map
                 };

                 return this.categories;
             }()
             ) */
        );
    }


    private createEmojis(json: any): EmojiCollections {
        const value = ElementFactory.create(json, Emoji.extractionOption).parse();

        return value.this;
    }


    public search$(text: string) {
        return this.emojis$.pipe(
            mergeMap(data => data.search$(text))
        );
    }

}
