
// www.js, index.js, main.js, etc
const TSModuleAlias = require('@momothepug/tsmodule-alias');
// Path from package.json to your tsconfig.json file
const tsconfigToReadFromRoot = './';
// Makes it work with play method, merging custom aliases
const aliasRegister = TSModuleAlias.play(tsconfigToReadFromRoot);


aliasRegister.addPathAlias(
    'json-object-parser/*',
    '../../../JsonObjectParser/src/parser/*'
);


aliasRegister.addPathAlias(
    'decorator-saveprop/*',
    '../../../Decorators/SaveProperty/src/*'
);

import { SaveProp } from 'decorator-saveprop/save-properties';

import { ElementFactory } from 'json-object-parser/element-factory';

import { Emoji, EmojiMembersOptionProperties, EmojiObjectOptionProperties } from './emoji';
import { SkinVariation, SkinVariationObjectOptionProperties, SkinVariationMembersOptionProperties } from './skin-variation';

import { LiteralOptionProperties } from 'json-object-parser/litral/literal-option';
import { ArrayOptionProperties } from 'json-object-parser/array/array-option';

import * as emojiSource from 'emoji-datasource/emoji.json';


import * as fs from 'fs-extra';
import * as path from 'path';


function $writeJson(fileName: string, json: any[]) {

    return fs.ensureFile(fileName)
        .then(() => fs.writeJson(fileName, json).then(
            () => fileName,
            err => Promise.reject(err)
        ))
        .catch(err => Promise.reject(err));
}


class System {
    @SaveProp() apple: 'apple';
    @SaveProp() google: 'google';
    @SaveProp() twitter: 'twitter';
    @SaveProp() emojione: 'emojione';
    @SaveProp() facebook: 'facebook';
    @SaveProp() messenger: 'messenger';
}

type SystemType = keyof System;


function getOption(system: SystemType) {
    const listEmojisOption = {
        mutate: (key: string, emoji: any) => {
            if (emoji.text && emoji.texts) emoji.texts.unshift(emoji.text);
            delete emoji.text;

            emoji.has_img = emoji[`has_img_${system}`];
            delete emoji[`has_img_${system}`];

            if (emoji.name === null)
                emoji.name = emoji.short_names[0].toUpperCase().split('_').join(' ').trim();

            return emoji;
        },

        object: {
            filter: (key: string, value: any) => {
                if (key !== 'name' && value === null)
                    return false;

                if (key.startsWith('has_img'))
                    return key === `has_img_${system}` ? true : false;

                return true;
            },

            properties: {
                name: true,
                unified: true,
                image: true,
                sheet_x: true,
                sheet_y: true,
                short_names: true,
                text: true,
                texts: true,
                category: true,

                has_img_apple: true,
                has_img_google: true,
                has_img_twitter: true,
                has_img_emojione: true,
                has_img_facebook: true,
                has_img_messenger: true,

                skin_variations: {
                    all: true,
                    mutate: (key: string, variation: any) => {
                        variation.has_img = variation[`has_img_${system}`];
                        delete variation[`has_img_${system}`];

                        return variation;
                    },

                    properties: {
                        all: true,

                        filter: (key: string, value: any) => {
                            if (value === null)
                                return false;

                            if (key.startsWith('has_img'))
                                return key === `has_img_${system}` ? true : false;

                            return key === 'added_in' ? false : true;
                        }
                    } as SkinVariationObjectOptionProperties

                } as EmojiObjectOptionProperties

            } as EmojiMembersOptionProperties

        } as EmojiObjectOptionProperties

    } as ArrayOptionProperties;



    return listEmojisOption;
}

const jsonDir = 'json';

for (const prop of SaveProp.get(System)) {
    const system: SystemType = prop.name as SystemType;


    const extractedJson = ElementFactory.create(emojiSource, getOption(system)).parse();



    $writeJson(path.join(jsonDir, `emojis-${system}.json`), extractedJson).then(
        fileName => console.log(`${fileName} :)`),
        err => console.error(err)
    );
}

/* const system: SystemType = 'apple';
const extractedJson = Element.create(emojiSource, getOption(system)).parse();


$writeJson(path.join(jsonDir, `emojis-${system}.json`), extractedJson).then(
    fileName => console.log(`${fileName} :)`),
    err => console.error(err)
);
 */
