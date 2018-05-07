import { PlatformString } from '@model/platform';

export type UrlFunctor<Arg, Return> = (arg: Arg) => Return;

export type UrlGenerator = (...parameters: any[]) => string;

export interface URLParameters {
    protocol?: string;
    base?: string;
    loacation?: string;
    platform: PlatformString;
    [whatyouwant: string]: string;
}
