const getImage = require('./crawler.js');
/*   enter your requirement   */
const info = {
    mainUrl: "http://my.nthu.edu.tw/~res9202/",
    //define your limitation on src content
    re_macro: [
        [/reaction/, false],
    ],
    //define the path you want to store in your filesystem.DO NOT use the "/" to wrap the path
    //NOTE:if the path is start with "/",it refers to root directory in windows system
    path: "nthuAstro"
}
getImage(info);
