import { FastDom } from '@modules/core/fastdom/fastdom';

export class SkeletonList {
    public categories: string[] = ['skeletonCategory0'];
    public emojisByCategory: { [category: string]: any[] };

    private constructor(private list: HTMLElement, private fastdom: FastDom) { }


    static create(list: HTMLElement, fastdom: FastDom) {
        const skeleton = new SkeletonList(list, fastdom);
        return skeleton.createSkeletonList().then(() => skeleton);
    }

    private numberEmojis() {
        const width = Math.floor(this.list.clientWidth * 0.9 / (25 + 9));
        const height = Math.floor((this.list.parentElement.clientHeight - 40 - 4.5 - 6) / (25 + 9));
        return width * height;
    }


    private createSkeletonList() {
        return this.fastdom.measure(() => this.numberEmojis()).then(
            number => {
                for (const category of this.categories)
                    this.emojisByCategory[category] = Array(number).fill(0);
            });
    }
}
