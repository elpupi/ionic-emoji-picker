import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'codeToUnicode'
})

export class CodeToUnicodePipe implements PipeTransform {
    transform(code: string): string {
        return code.split('-').map(c => `&#x${c};`).join('');
    } // parseInt(code.split('-')[0], 16)
}
