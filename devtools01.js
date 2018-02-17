/**
 * Created by hua on 2017/9/12.
 */


//联系人列表
var Contact;
//微信初始化
var wxInit;
//群联系
var webwxbatchgetcontact=null;
var webwxbatchgetcontact_si;

var signal_a;
var signal_a_2;

var signal_b;
var signal_b_2;

/**
 * dev域用于toolbar的网络监听
 *
 *
 */
chrome.devtools.network.onRequestFinished.addListener(
    function (request) {


        //匹配地址
        signal_a = request.request.url.indexOf('wx2.qq.com');
        signal_a_2 = request.request.url.indexOf('wx.qq.com');

        signal_b = request.request.url.indexOf('wx2.qq.com/cgi-bin/mmwebwx-bin/webwxbatchgetcontact');
        signal_b_2 = request.request.url.indexOf('wx.qq.com/cgi-bin/mmwebwx-bin/webwxbatchgetcontact');


        if ((signal_b > 0||signal_b_2>0)&&request.request.url.indexOf("me=me")<0) {//me=me是循环标志
            request.getContent(function (body) {

                //判断数据来存储联系群
                if (!webwxbatchgetcontact) {
                    webwxbatchgetcontact = body;
                    webwxbatchgetcontact_si=request.request;
                } else if (JSON.parse(webwxbatchgetcontact).Count < JSON.parse(body).Count&&body!=null) {
                    webwxbatchgetcontact = body;
                    webwxbatchgetcontact_si=request.request;
                }

                //发送初始化好的消息给background层
                chrome.extension.sendRequest({
                    Contact: Contact,
                    tabId: chrome.devtools.inspectedWindow.tabId,
                    BaseRequest: request.request,
                    wxInit: wxInit,
                    webwxbatchgetcontact: webwxbatchgetcontact_si,
                    url: request.request.url,
                });
            });
        } else if ((signal_a > 0||signal_a_2>0)&&request.request.url.indexOf("me=me")<0) {//me=me是循环标志
            request.getContent(function (body,base64) {
                //初始化监听
                if (request.request.url.indexOf("cgi-bin/mmwebwx-bin/webwxinit") > 0&&body!=null) {
                    wxInit = request.request;
                }

                //获取联系人
                if ((request.request.url.indexOf("cgi-bin/mmwebwx-bin/webwxgetcontact") > 0)&&
                    request.request.url.indexOf('skey')>0&&body!=null) {
                    Contact = request.request;

                }

                //所有消息均发送到background层
                chrome.extension.sendRequest({
                    tabId: chrome.devtools.inspectedWindow.tabId,
                    url: request.request.url,
                    params: request.request,
                    content: body,
                    base64:base64
                });
            });
        }
    });











// chrome.devtools.inspectedWindow.eval("var aa=10");
// chrome.devtools.inspectedWindow.eval({ file: "test02.js" });
// chrome.devtools.inspectedWindow.eval(
//     'aa('+escape(request.request.url)+'111)');

// chrome.extension.sendRequest({
//     command: "sendToConsole",
//     tabId: webInspector.inspectedWindow.tabId,
//     args: request.request.url
// });