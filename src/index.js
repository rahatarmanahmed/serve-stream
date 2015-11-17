#!/usr/bin/env node

import cp from 'child_process';

import express from 'express';
import morgan from 'morgan';
import subarg from 'subarg';

const args = subarg(process.argv.slice(2));

const app = express();

app.use(morgan());

for(const sub of args._) {
    const [path, cmd] = sub._;

    app.all(path, (req, res) => {
        const proc = cp.spawn('sh', ['-c', cmd]);

        req.pipe(proc.stdin);
        proc.stderr.pipe(process.stdout, { end: false });
        proc.stdout.pipe(res);
    });
}

app.listen(8080);
