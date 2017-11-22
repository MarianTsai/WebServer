// 載入 http 的模組
const http = require('http');
// 引用 File System 模組
const fs = require('fs');

var url = require('url');
var path = require('path');

// 設定 port 預設為 1337，若系統環境有設定則以系統環境設定為主
var port = process.env.PORT || 1337;

var file_content;

var webPath = 'public';

var server = http.createServer(function(req, res) {
    // req 是 request 本地端請求的訊息
    // res 是 response 主機回傳到本地端的訊息

    // 解析使用者要求的路徑名稱
    let url_path = url.parse(req.url);  //去除127.0.0.1:1234/只取後面的
    console.log('path:' + url_path);
    let pathname = url_path.pathname;
    console.log('pathname:' + pathname);

    // 判斷pathname是否為預設路徑
    //打/和/index.htm都是導到index.html
    if (pathname === "/" || pathname === "/index.htm") {
        pathname = 'index.html';
    }

    // __dirname 是目前這隻程式的路徑
    // webPath 是公開的資料夾
    // pathname 是使用者要求的路徑名稱
    //join是把上面的三個結合變成絕對路徑，存成filePath
    var filePath = path.join(__dirname, webPath, pathname);
    console.log('filePath:' + filePath);

    var resHeader = {
        'Accept-Charset': 'utf-8',
        'Accept-Language': 'zh-TW',
        'Content-Type': 'text/html; charset=utf-8',
    }


    // 讀取檔案
    fs.readFile(filePath, 'utf8', function(err, content) {
        if (err) { //如果err有東西
            console.log('Failed to read');
            // 若檔案讀取錯誤，回傳 404
            res.writeHead(404, resHeader);
            res.write('<h1>404. 找不到檔案!!</h1>')
            res.end();
            return;
        }
        // 將檔案內容傳給瀏覽器
        res.writeHead(200, resHeader);
        res.write(content);
        res.end();
    })
});

// 啟動並等待連接
server.listen(port);
console.log('Server running at http://127.0.0.1:' + port);
