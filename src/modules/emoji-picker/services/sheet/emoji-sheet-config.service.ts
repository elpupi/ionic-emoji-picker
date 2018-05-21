import { Injectable } from '@angular/core';

import { UrlFunctor } from '@services/url.definition';
import { PlatformString } from '@model/platform';
import { Dimension } from '@model/dimension/dimension';

import { Util } from '@util/util';

export interface Sheet {
    use: boolean;
    type: EmojiType;
    dimension?: Dimension;
    margin?: number;
}

export interface Parameters {
    platform?: PlatformString;
    resolution?: number;
    sheet?: Sheet;
}


export interface UrlConfig {
    raster?: UrlFunctor<Parameters, string>;

    vector?: UrlFunctor<Parameters, string>;
}

export type EmojiType = 'raster' | 'svg';



@Injectable()
export class EmojiSheetConfig {
    raster?: UrlFunctor<Parameters, string> = (params: Parameters) => `assets/sprite/${params.platform}/sheets/${params.resolution}.png`;
    svg?: UrlFunctor<Parameters, string> = (params: Parameters) => `assets/sprite/${params.platform}/sheets/${params.platform}.svg`;

    public parameters?: Parameters = {
        platform: 'apple',
        resolution: 32,
        sheet: {
            use: false, margin: 0, type: 'raster'
        },
    };



    /* static readonly rasterType = ['png', 'jpeg', 'jpg', 'bmp', 'gifs'];
    static readonly vectorType = ['svg']; */

    constructor(config?: EmojiSheetConfig) {
        if (config !== undefined) Util.assignRecursive(this, config);

        /*   if (this.url === '')
              this.sheet = false; */

        // this.inferType();
    }


    /* private inferType() {
        if (this.url !== '' && this.type === undefined) {
            const extensionIndex = this.url.lastIndexOf('.');

            // extension exists
            if (extensionIndex !== -1) {
                const extenstion = this.url.slice(extensionIndex + 1);

                if (EmojiSheetConfig.rasterType.find(ext => ext === extenstion) !== undefined)
                    this.type = 'raster';
                else if (EmojiSheetConfig.vectorType.find(ext => ext === extenstion) !== undefined)
                    this.type = 'vector';
                else
                    throw new Error(`config.url doesn't have an extension (${EmojiSheetConfig.rasterType.join(' ')} ${EmojiSheetConfig.vectorType.join(' ')}).
                    So config.type has to be specified`);
            }
        }
    } */




}
