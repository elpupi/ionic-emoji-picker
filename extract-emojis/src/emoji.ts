import { MembersOptionProperties, ObjectOptionProperties } from 'json-object-parser/object/object-option';
import { OptionProperties } from 'json-object-parser/option';

import { SkinVariation } from './skin-variation';

export class Emoji {
    name?: string;
    unified: string; // UTF16;
    non_qualified?: string; // UTF16;
    docomo?: string;
    au?: string;
    softbank?: string;
    google?: string;
    image: string;
    sheet_x: number;
    sheet_y: number;
    short_name: string;
    short_names: Array<string>;
    text?: string;
    texts?: Array<string>;
    category: string;
    sort_order: number;
    added_in: string;
    has_img_apple: boolean;
    has_img_google: boolean;
    has_img_twitter: boolean;
    has_img_emojione: boolean;
    has_img_facebook: boolean;
    has_img_messenger: boolean;
    obsoletes: string;
    obsoleted_by: string;
    skin_variations: Array<SkinVariation>;
}



export type EmojiMembersOptionProperties = {[K in keyof Emoji]?: OptionProperties | boolean };

export interface EmojiObjectOptionProperties extends OptionProperties {
    elementOption?: EmojiMembersOptionProperties | boolean;
    properties?: EmojiMembersOptionProperties | boolean;
}
