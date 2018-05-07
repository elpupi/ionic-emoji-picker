import { Injectable } from '@angular/core';


const fastdom: FastDom = require('fastdom');
const fastdomPromised: FastDomExtension = require('fastdom/extensions/fastdom-promised');
const FastdomSandbox: { sandbox: () => FastDomExtension } = require('fastdom/extensions/fastdom-sandbox');

// import * as fastdomSandbox from 'fastdom/extensions/fastdom-sandbox';




// type CallbackFunction = () => void;
type CallbackFunction<Return = void> = (...args: any[]) => Return;



interface FastDomExtension {
    initialize: CallbackFunction;

    mutate: (fn: CallbackFunction, bindThis?: any) => any;

    measure: (fn: CallbackFunction, bindThis?: any) => any;

    clear: CallbackFunction;
}


const myFastdom = fastdom.extend(fastdomPromised).extend(FastdomSandbox.sandbox());

@Injectable()
export class FastDom {


    readonly reads: CallbackFunction[] = myFastdom.reads;
    readonly writes: CallbackFunction[] = myFastdom.writes;
    readonly scheduled: boolean = myFastdom.scheduled;
    readonly raf: (fn: CallbackFunction) => void = myFastdom.raf;


    measure<Return>(fn: CallbackFunction<Return>, bindThis?: any): Promise<Return> {
        return myFastdom.measure(fn, bindThis) as any as Promise<Return>;
    }

    mutate<Return>(fn: CallbackFunction<Return>, bindThis?: any): Promise<Return> {
        return myFastdom.mutate(fn, bindThis) as any as Promise<Return>;
    }


    clear(fn: CallbackFunction): boolean {
        return myFastdom.clear(fn);
    }

    extend(extension: FastDomExtension): FastDom {
        return myFastdom.extend(extension);
    }
}
