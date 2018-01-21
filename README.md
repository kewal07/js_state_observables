# js_state_observables
---
A javascript only library to convert objects into observables and has handy API to manipulate the state
---
Detailed Documentation : [Here](https://kewal07.github.io/js_state_observables/output/)
---
## To use:
Clone this repository, change values in `.env` file according to your need.

- TARGET: Currently as `umd`. `umd` if you want your library to be imported as a node module and also be used in the browser or change to `browser` if you only want it to be used in the browser.
- NAME: The name of the library, webpack uses this as a wrapper for our library.

### Install dependencies:
Using npm:
```bash
$ npm install
```

### Build with webpack
Run:
```bash
$ npm run build
```
creates source file and also creates both minified and non-minified version

## Testing
Run:
```bash
$ npm npm run test:coverage
```

### Extra Information

## Detailed Documentation : 
[Here](https://kewal07.github.io/js_state_observables/out/) 

Most of the document has been generated via source code comments using the jsdoc package and store in the output directory. You can
run the command below as a post/pre build step to generate your own docs. However change the directory or you may loose some
manually added html in the current output directory.
```
npm install jsdoc
jsdoc /path/source/file/you/want/documented
```

## Sample: 
[Here](https://kewal07.github.io/js_state_observables/dist/sample.html)

ToDo: Create a dev sample that can be run using npm-dev. Showcase via animations and make a nice tutorial out of it.
You can use jsdom to simulate a headless browser to generate tests.

## Lint: 
There is also eslint used. Its there in the added dependencies. However have removed it now to avoid lots of warning and error 
like tabs and spaces and so on. The json for eslint is shown below and can be found at .eslintrc.json.
```
{
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
}
```
You can either add it to prebuild in
package.json as below
``` 
"prebuild":"./node_modules/.bin/eslint src/"
```
or directly run from cmd as 

``` 
./node_modules/.bin/eslint src/
```
By default the output is looged to stdout but you can save it to a file usine the below -o option
```
./node_modules/.bin/eslint src/ -o /eslint_output.html
```
## More ToDos: 
- Add references to all the fantastic tutorials and documentations
- Add reference to all the plugins source page
- Extend and add more functionalities to the plugin

## Want To Contribute?
Fork this repo, make changes, test and send a pull request.
