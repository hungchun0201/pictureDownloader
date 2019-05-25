# A simple picture downloader using Node.js

> this program can download the image in the website with img tag.
## Usage

```
node main.js
```
## API
### Just enter your requirement in info!
* enter the require URL
``` 
 mainUrl: "myURL",
```
* you can add limitations by regExp
* the first element in the subarray is the regExp you want to distinguish in src attribute.
* the second element means whether you want the src string match the regExp
```
    re_macro: [
        [myRegExp1, false],
        [myRegExp2, ture]
    ],
```
* set the path you want to store
* Note : DO NOT use the "/" to wrap the path.if the path is start with "/" ,it refers to root directory in windows system
```
    path: "myPath"
```