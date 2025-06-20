#!/bin/bash

#Should be ran from the project root directory (not inside tools folder)

 grep script "index.html" | grep src | grep -v http | grep -v defer | grep -v seedrandom | grep -v codemirrorLogomor | grep -o '[a-zA-Z0-9/]\+\.js' | xargs cat > deploy/logomorApp.js

 curl -X POST -s --data-urlencode 'input@deploy/logomorApp.js' https://www.toptal.com/developers/javascript-minifier/api/raw > deploy/logomorApp.min.js

 curl -X POST -s --data-urlencode 'input@js/editor/codeEditorConfiguration.js' https://www.toptal.com/developers/javascript-minifier/api/raw > deploy/codeEditorConfiguration.min.js
 
 