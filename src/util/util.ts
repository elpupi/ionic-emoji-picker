/* export function assignRecursive(out: { [k: string]: any }, ...ins: { [k: string]: any }[]) {
    const to = Object(out);

    for (const inn of ins) {
        for (const prop of Object.keys(inn)) {

            // recursion
            if (typeof inn[prop] === 'object' && inn[prop] !== null)
                to[prop] = assignRecursive(out[prop], inn[prop]);
            else
                // normal case
                to[prop] = inn[prop];
        }
    }

    return to;
} */



interface PlainObj<T = any> {
    [k: string]: T;
}


type Copy<T> = {
    [K in keyof T]: T[K];
};

export class Util {

    static assignRecursive<T1 extends PlainObj, T2 extends PlainObj>(out: T1, inn: T2): Copy<T1 & T2>;
    static assignRecursive<T1 extends PlainObj, T2 extends PlainObj,
        T3 extends PlainObj>(out: T1, inn1: T2, inn2: T3): Copy<T1 & T2 & T3>;
    static assignRecursive<T1 extends PlainObj, T2 extends PlainObj,
        T3 extends PlainObj, T4 extends PlainObj>(out: T1, inn1: T2, inn2: T3, inn3: T4): Copy<T1 & T2 & T3 & T4>;
    static assignRecursive<T1 extends PlainObj, T2 extends PlainObj,
        T3 extends PlainObj, T4 extends PlainObj, T5 extends PlainObj>(out: T1, inn1: T2, inn2: T3, inn3: T4, inn4: T5): Copy<T1 & T2 & T3 & T4 & T5>;
    static assignRecursive(out: PlainObj, ...ins: PlainObj[]) {
        const to = Object(out);

        for (const inn of ins) {
            if (inn === undefined || inn === null)
                continue;

            for (const prop of Object.keys(inn)) {

                // recursion
                if (typeof inn[prop] === 'object' && inn[prop] !== null)
                    to[prop] = Util.assignRecursive(out[prop], inn[prop]);
                else
                    // normal case
                    to[prop] = inn[prop];
            }
        }

        return to;
    }

}

/* const a = Util.assignRecursive({ a: 1 }, { b: { b1: 1, b2: 'tt' } });
const b = Util.assignRecursive({ a: 1 }, { b: { b1: 1, b2: 'tt' } }, { c: { c1: 2 } });
 */
