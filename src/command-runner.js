// Mimic NodeJS's 'child_process' 'exec' function
export default function getCommandRunner(opts) {
    if(opts.command != null) {
        return [
            opts.command,
            (opts.commandArgument != null) ?
                [].concat(opts.commandArgument) :
                []
        ];
    }

    if(process.platform === 'win32') {
        return ['cmd.exe', ['/s', '/c']];
    }

    return ['/bin/sh', ['-c']];
}
