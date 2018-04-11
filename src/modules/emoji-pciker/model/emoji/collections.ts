import { EmojiData } from './emoji-data';
import { Categories } from '@model/category/category';

// tslint:disable-next-line:import-name
import Fuse from 'fuse.js/src/index';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


export type ByCategory = { [category: string]: EmojiData[] };


export interface ScanOption {
    returnEmojis?: boolean;
}

export class Collections {
    protected _byCategory: ByCategory = {};
    protected all: EmojiData[] = [];
    protected _categories: Categories;

    private static fuzzyOptions = {
        // id: 'author.lastName',
        shouldSort: true,
        tokenize: true,
        matchAllTokens: false,
        findAllMatches: false,
        includeScore: false,
        includeMatches: false,
        threshold: 0.4,
        location: 0,
        distance: 70,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        keys: [
            'shortNames',
            'category'
        ]
    };
    /*   fuzzyOptions2 = {
          // id: 'author.lastName',
          shouldSort: true,
          tokenize: true,
          matchAllTokens: false,
          findAllMatches: false,
          includeScore: true,
          includeMatches: true,
          threshold: 0.65,
          location: 0,
          distance: 70,
          maxPatternLength: 32,
          minMatchCharLength: 2,
          keys: [
              // 'shortNames.value',
              'category'
          ]
      };

      // new fuse(json, options3).search('heart')

      options = {
          // id: 'author.lastName',
          shouldSort: true,
          tokenize: true,
          matchAllTokens: false,
          findAllMatches: false,
          includeScore: false,
          includeMatches: false,
          threshold: 0.65,
          location: 0,
          distance: 70,
          maxPatternLength: 32,
          minMatchCharLength: 2,
          keys: [
              'n.value',
              'c'
          ]
      };
      options4 = {
          shouldSort: true,
          includeScore: true,
          includeMatches: true,
          threshold: 0.3,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [
              'name',
              'category'
          ]
      };
      // new fuse(json, options3).search('heart').map(r=>({indices: r.matches.indices, item: r.item}))
 options3 = {
          shouldSort: true,
          includeScore: true,
          includeMatches: true,
          threshold: 0.3,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [
              'shortNames.value',
              'category'
          ]
      };


  // new fuse(json, options3).search('heart').map(r=>({matches: r.matches.map(m=>({value: m.value, key: m.key, indices: m.indices})), item: r.item}))
  function show(found) {
      for (const f of found) {
          console.log(f.item);
          for (const m of f.matches) {
              console.log(m.key, m.value, m.indices);
          }
      }
  }


json=require('./extract-emojis/node_modules/emoji-datasource/emoji.json')
fuse=require('fuse.js')
  show( new fuse(json, fuzzyOptions).search('heart'))
   */

    constructor() { }


    public get byCategory() {
        return this._byCategory;
    }


    public get categories(): string[] {
        return Object.keys(this._byCategory); // .map(category => this.byCategory[category][0]);
    }

    public get list() {
        return this.all;
    }

    protected pushCategory(category: string, emoji: EmojiData) {
        const categ = this.byCategory[category] === undefined ? this.byCategory[category] = [] : this.byCategory[category];
        categ.push(emoji);
    }



    public fromProperty(
        property: keyof EmojiData, value: EmojiData[keyof EmojiData],
        comp: PropertyComparator<EmojiData[keyof EmojiData]> = defaultComparator) {

        for (const emoji of this.all) {
            if (comp(emoji[property], value))
                return emoji;
        }

        return undefined;
    }

    public search$(text: string) {
        // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
        const normalizedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const foundByCategory: ByCategory = {};

        for (const category of this.categories) {
            const fuse = new Fuse(this.byCategory[category], Collections.fuzzyOptions);
            const found: EmojiData[] = fuse.search(normalizedText);

            /*     const option2 = Object.assign({}, Collections.fuzzyOptions, {
                    includeScore: true, includeMatches: true
                });
                const found2 = new Fuse(this.byCategory[category], option2).search(normalizedText);
     */
            if (found.length !== 0) {
                foundByCategory[category] = found;
            }
        }

        // return foundByCategory;
        return of(foundByCategory);
    }



    public scan(text: string, options: ScanOption = {}): { replacedText: string, emojis?: Array<EmojiData> } {
        return undefined;
    }
}



type PropertyComparator<T> = (v1: T, v2: T) => boolean;

type Properties = EmojiData[keyof EmojiData];
const defaultComparator: PropertyComparator<Properties> = (v1: Properties, v2: Properties) => v1 === v2;
