#!/usr/bin/env node

import cp from 'child_process';

import express from 'express';
import morgan from 'morgan';
import subarg from 'subarg';

import getCommandRunner from './command-runner';

function mapKeys(obj, fn) {
    const out = {};
    for(const k in obj) {
        out[fn(k)] = obj[k];
    }
    return out;
}

const args = subarg(process.argv.slice(2), {
    alias: {
        port: 'p',
        command: 'c',
        commandArgument: 'a'
    },
    string: ['command', 'commandArgument'],
    default: {
        port: 8080
    }
});

const app = express();

app.use(morgan());

for(const sub of args._) {
    const [path, cmd] = sub._;

    app.all(path, (req, res) => {
        const [runner, params] = getCommandRunner(args);
        const proc = cp.spawn(runner, [...params, cmd], {
            env: {
                ...process.env,
                ...mapKeys(req.params, k => 'serve_param_' + k),
                ...mapKeys(req.query, k => 'serve_query_' + k)
            }
        });

        req.pipe(proc.stdin);
        proc.stderr.pipe(process.stdout, { end: false });
        proc.stdout.pipe(res);

        proc.on('error', console.error);
    });
}

app.listen(args.port);
