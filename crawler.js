var request = require('request');
var cheerio = require('cheerio');

//function for get Image URL 
const fetchImageURL = (info) => new Promise((resolve, reject) => {
    request(info.mainUrl, function (error, response, html) {
        if (error) reject(error);
        var $ = cheerio.load(html);
        let returnData = [];
        const is_local = /^(http)/
        //get the image url by src attr in img tag
        $("img").each(function (i, element) {
            if (info.re_macro.every((item) => {
                return item[0].test(element.attribs.src) === item[1];
            }))//check whether the img src match your requirement in re_macro
            {
                console.log(element.attribs);

                if (element.attribs["data-src"]) {
                    returnData.push({
                        //define your file name.Using alt first ,class second ,or calling it as img directly.
                        name: ($(this).attr("alt") || $(this).attr("class") || "img") + "_" + i,
                        //get the url in src.If the url is localside,add its own mainurl before it.
                        link: $(this).attr('data-src').match(is_local) ? $(this).attr('data-src') :
                            info.mainUrl + '/' + $(this).attr('data-src'),
                    })
                }
                else {
                    returnData.push({
                        //define your file name.Using alt first ,class second ,or calling it as img directly.
                        name: ($(this).attr("alt") || $(this).attr("class") || "img") + "_" + i,
                        //get the url in src.If the url is localside,add its own mainurl before it.
                        link: $(this).attr('src').match(is_local) ? $(this).attr('src') :
                            info.mainUrl + '/' + $(this).attr('src'),
                    })
                }

            }
        });
        resolve(returnData);
    })
})


//function for download image
var fs = require('fs');
var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        if (err) {
            console.error(err, "in link " + uri);
            return;
        }
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        let file_type = res.headers["content-type"].split("image/")[1];
        if (file_type === undefined) {
            console.error("Not a image");
            return;
        }
        request(uri)
            .pipe(fs.createWriteStream(filename + "." + file_type))
            .on('close', callback);
    });
};


/* execute it */

//if the require path is not exist ,create it
module.exports = function (info) {
    if (!fs.existsSync(info.path)) {
        fs.mkdirSync(info.path, () => {
            console.log("created path:", info.path)
        });

    }
    fetchImageURL(info).then(data => {
        console.log(data);
        data.forEach((elem, index) => {
            download(elem.link, "./" + info.path + "/" + elem.name, function () {
                console.log('done for : ', elem.link);
            });
        })
    }).catch((error) => { console.log(error) })
}

