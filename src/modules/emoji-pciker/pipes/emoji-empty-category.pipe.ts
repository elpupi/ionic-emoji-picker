import { Pipe, PipeTransform } from '@angular/core';
import { ByCategory } from '@model/emoji/collections';

@Pipe({
    name: 'notEmptyEmojiCategory'
})

export class EmojiEmptyCategoryPipe implements PipeTransform {
    transform(categories: ByCategory): ByCategory {
        const nonEmptyCategories = {};

        for (const category of Object.keys(categories)) {
            if (categories[category].length !== 0)
                nonEmptyCategories[category] = categories[category];
        }

        return nonEmptyCategories;
        // return categories.filter(category => emojis.length !== 0);
    }
}
