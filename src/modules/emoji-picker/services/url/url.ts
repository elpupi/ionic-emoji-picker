import { URLParameters } from './url-types';

export class URL {
    private strings: TemplateStringsArray;
    private keys: string[];
    private parameters: URLParameters;

    constructor() { }

    public static generateURL() {
        const newURL = new URL();
        return newURL.generateURL.bind(newURL);
    }

    public generateURL(strings: TemplateStringsArray, ...keys: string[]) {
        const found = keys.find(key => key === 'platform');
        if (found === undefined) {
            // tslint:disable-next-line:quotemark
            throw new Error("the template string must have at least a parameter ${'platform'}");
        }

        this.strings = strings;
        this.keys = keys;



        return this.concatKeyVal.bind(this);
    }


    private concatKeyVal() {
        if (Object.keys(this.parameters).length !== this.keys.length) {
            throw new Error(`parameters.length has to be ${this.keys.length}`);
        }


        let res = '';

        for (let i = 0; i < this.strings.length; ++i) {
            res += this.strings[i] + (this.parameters[this.keys[i]] || '');
        }

        return res;
    }

}
