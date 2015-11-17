// Mimic NodeJS's 'child_process' 'exec' function
export default function getCommandRunner() {
    if(process.platform === 'win32') {
        return ['cmd.exe', ['/s', '/c']];
    }

    return ['/bin/sh', ['-c']];
}
