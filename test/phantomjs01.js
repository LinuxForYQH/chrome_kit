/**
 * Created by hua on 2017/9/11.
 */
phantom.outputEncoding = "gbk";
console.log("开始.................")
console.log("请等待一分钟内会在本件同目录下生成二维码")
var page = require('webpage').create();
page.open("https://wx.qq.com/", function (status) {
});


var contact_list;//联系人
var timedCount01_signal = 0;//timedCount01循环函数是否启动的标志
var synccheck_url;//保存同步用的url

var postData;//请求参数

page.onResourceRequested = function (request) {


    //获取请求参数
    if (request.postData){
        postData = request.postData;
    }



};


page.onResourceReceived = function (response) {

    //图片生产标志
    var login_signal = JSON.stringify(response.url, undefined, 4).indexOf("https://login.wx.qq.com/cgi-bin/mmwebwx-bin/login");

    //获取联系人标志
    var contact_signal = JSON.stringify(response.url, undefined, 4).indexOf("https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxgetcontact");
    var contact_url = response.url;

    //console.log(response.url);
    //console.log(JSON.stringify(response.url, undefined, 4));

    //消息检查标志
    var synccheck_signal = JSON.stringify(response.url, undefined, 4).indexOf("https://webpush.wx2.qq.com/cgi-bin/mmwebwx-bin/synccheck");

    if (login_signal == 1) {
        console.log("打印图片。。。。。。。。。。。。。");
        page.render('example.png');
    }


    if (contact_signal == 1) {
        var contact = page.evaluate(function (s) {
            var temp = 0;
            $.ajax({
                async: false,
                url: s ,
                success: function (data) {
                    temp = data;
                }
            })
            return temp;
        },contact_url);
        console.log(contact);
    }

    //如果没有启动timedCount01函数，这个时候启动
    if (synccheck_signal == 1 && timedCount01_signal == 0) {
        timedCount01_signal = 1;
        synccheck_url = response.url;
        timedCount01();
    }

};

/**
 * 循环定时器，保持session不过时
 *
 */
function timedCount01() {

    console.log("保持在线")

    var temp = page.evaluate(function (s) {
        var temp = 0;
        $.ajax({
            type: "GET",
            //async: false,
            contentType: "text/javascript",//同步请求失效
            url: s,
            success: function (data) {
                temp = data;
            }
        })
        return temp;
    }, synccheck_url);
    //console.log(temp);
    setTimeout("timedCount01()", 10000)
}












