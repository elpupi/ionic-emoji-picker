import { Injectable } from '@angular/core';
import { CategoryDefinition } from '@model/category/category-definition';
import { categoriesDefinition } from '@data/categories-definition';
import { Util } from '@util/util';


@Injectable()
export class CategoryConfig {
    public categories: CategoryDefinition[] = categoriesDefinition;


    constructor(config?: CategoryConfig) {
        if (config !== undefined) Util.assignRecursive(this, config);
    }
}
