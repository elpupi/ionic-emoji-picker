export class Platform {
    apple = 'apple';
    google = 'google';
    twitter = 'twitter';
    emojione = 'emojione';
    facebook = 'facebook';
    messenger = 'messenger';
}

export type PlatformString = keyof Platform;
