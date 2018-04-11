import { MembersOptionProperties, ObjectOptionProperties } from 'json-object-parser/object/object-option';
import { OptionProperties } from 'json-object-parser/option';

export class SkinVariation {
    unified: string; // UTF16;
    image: string;
    sheet_x: number;
    sheet_y: number;
    added_in: string;
    has_img_apple: boolean;
    has_img_google: boolean;
    has_img_twitter: boolean;
    has_img_emojione: boolean;
    has_img_facebook: boolean;
    has_img_messenger: boolean;
}



export type SkinVariationMembersOptionProperties = {[K in keyof SkinVariation]?: OptionProperties | boolean } & OptionProperties;

export interface SkinVariationObjectOptionProperties extends OptionProperties {
    elementOption?: SkinVariationMembersOptionProperties | boolean;
    properties?: SkinVariationMembersOptionProperties | boolean;
}
