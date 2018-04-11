import * as ranking from 'emoji-rankings/rankings.json';
import * as path from 'path';
import * as fs from 'fs-extra';

const top = 100;

const all = ranking as any as any[];
const tops = all.slice(0, top).map(e => e.name.toLowerCase());

const inputDir = 'json';


const outdir = 'json-top';
fs.ensureDirSync(outdir);

const outDir = 'json-top';
for (const emojisFile of fs.readdirSync(inputDir)) {
    const fileNoExt = path.basename(emojisFile).split('.')[0];

    const outputFile = path.join(outdir, `${fileNoExt}.top${top}.json`);


    const emojisJson: any[] = fs.readJsonSync(path.join(inputDir, emojisFile));

    const emojisTop = emojisJson.filter(emoji => {
        if (emoji.name !== undefined && tops.includes(emoji.name.toLowerCase()))
            return true;
    });

    fs.writeJson(outputFile, emojisTop).then(
        () => console.log(`${outputFile} done :)`),
        err => console.log(err)
    );
}
