import * as  fs from 'fs';
import * as  path from 'path';
import * as  chalk from 'chalk';
const log = console.log;
import * as  Confirm from 'prompt-confirm';
import { ParserEngine } from 'tspath/parser-engine';
import { ParentFileFinder } from 'tspath/parent-file-finder';
import { TS_CONFIG } from 'tspath/type-definitions';
// import * as  pkg from './package.json';

export class TSPath {
    engine: ParserEngine;

    constructor() {
        this.engine = new ParserEngine();
        // log(chalk.yellow('TSPath ' + pkg.version));
        const args = process.argv.slice(2);

        const param = args[0];
        const projectPath = process.cwd();
        const findResult = ParentFileFinder.findFile(projectPath, TS_CONFIG);

        // tslint:disable-next-line:no-var-self
        const scope = this;
        if (param === '-f' && findResult.fileFound) {
            scope.processPath(findResult.path);
        }
        else if (findResult.fileFound) {
            log('Process project at: <' + findResult.path + '> ?');

            scope.processPath(findResult.path);
        }
        else {
            log('No project root found!');
        }
    }
    processPath(projectPath) {
        if (this.engine.setProjectPath(projectPath)) {
            this.engine.execute();
        }
    }
    parseCommandLineParam() {
        const args = process.argv.slice(2);
        let param = null;
        if (args.length !== 1) {
            param = args[0];
        }
        return param;
    }
}

new TSPath();
