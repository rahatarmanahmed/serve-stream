# serve-stream [![Build Status](https://travis-ci.org/raymond-h/serve-stream.svg?branch=master)](https://travis-ci.org/raymond-h/serve-stream)
Super simple HTTP server that just serves command output

## Installing
`npm install -g serve-stream` (or just use [`npx`](https://github.com/zkat/npx), also included with npm 5.2.0+)

## Example usage
```sh
serve-stream \
	[ "/one/path/here" "echo Whatever command to run here!" ] \
	[ "/some/other/path" "fortune | cowsay" ] \
	[ "/lowercase" "tr 'A-Z' 'a-z'" ]

### in another terminal
# the command is run, and the stdout of the command
# is given as response body
curl http://localhost:8080/one/path/here
# -> Whatever command to run here!

# the command is fed into /bin/sh on Unix-like systems,
# and cmd.exe on Windows systems (mirrors child_process's 'exec' function)
curl http://localhost:8080/some/other/path
# ->  _______________________________________
# -> / Tomorrow, this will be part of the    \
# -> | unchangeable past but fortunately, it |
# -> \ can still be changed today.           /
# ->  ---------------------------------------
# ->         \   ^__^
# ->          \  (oo)\_______
# ->             (__)\       )\/\
# ->                 ||----w |
# ->                 ||     ||

# supports POST (and other methods with bodies)
# the body is fed in as stdin to the command
echo HELLO WORLD | curl -d @- http://localhost:8080/lowercase
# -> hello world
```
    
## License
The MIT License (MIT)

Copyright (c) 2015 Raymond Hammarling

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
