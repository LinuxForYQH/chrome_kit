/**
 * Created by hua on 2017/9/12.
 */

//联系人列表
var Contact;
//基础参数
var BaseRequest;
//最新的消息
var news;
//微信初始化
var wxInit;
//群联系
var webwxbatchgetcontact;

var Msg = {
    Type: 1,
    Content: "0",
    FromUserName: "0",
    ToUserName: "0",
    LocalID: "0",
    ClientMsgId: "0"
}


/**
 * 接收来自background的消息
 *
 */
chrome.extension.onRequest.addListener(function (request) {

    console.log(request);

    //监听最新的消息
    if (request.url.indexOf("wx2.qq.com/cgi-bin/mmwebwx-bin/webwxsync") >= 0) {
        if (!request.content) return;
        news = JSON.parse(request.content);
        if (news.AddMsgCount && news.AddMsgCount > 0 && wxInit != null && (news.AddMsgList[0].Content != '')) {
            $.ajax({
                url: request.url + "&me=me",//避开循环标志
                type: 'POST',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify(JSON.parse(request.params.postData.text)),
                dataType: "json",
                success: function (data) {
                    Msg.Content = "机器人：" + data.AddMsgList[0].Content;
                    Msg.ToUserName = "filehelper";
                    Msg.FromUserName = wxInit.User.UserName;
                    webwxsendmsg(BaseRequest, Msg)
                }
            })
        }
    }

    //初始化监听
    if (request.url.indexOf("wx2.qq.com/cgi-bin/mmwebwx-bin/webwxbatchgetcontact") >= 0) {
        if (!request.Contact || !request.BaseRequest || !request.wxInit || !request.webwxbatchgetcontact) return;

        wxInit_a(request);
        Contact_a(request);
        webwxbatchgetcontact_a(request);

        BaseRequest = JSON.parse(request.BaseRequest.postData.text)
    }


});


/**
 *发送文字消息
 *格式如下
 {
     BaseRequest: { Uin: xxx, Sid: xxx, Skey: xxx, DeviceID: xxx },
     Msg: {
         Type: 1 文字消息,
         Content: 要发送的消息,
         FromUserName: 自己的ID,
         ToUserName: 好友的ID,
         LocalID: 与clientMsgId相同,
         ClientMsgId: 时间戳左移4位随后补上4位随机数
     }
 }
 */

var clientMsgId;
function webwxsendmsg(BaseRequest, Msg) {

    clientMsgId = new Date().getTime()
        + (Math.random() + "").substring(2, 6);
    Msg.LocalID = clientMsgId;
    Msg.ClientMsgId = clientMsgId;
    $.ajax({
        url: 'https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxsendmsg',
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({
            BaseRequest: BaseRequest.BaseRequest,
            Msg: Msg,
            Scene: 0
        }),
        dataType: "json",
        success: function (data) {
            console.log(data)
        }
    })

}

/**
 *初始化个个人
 * @param request
 */
function wxInit_a(request) {
    $.ajax({
        url: request.wxInit.url,
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(JSON.parse(request.wxInit.postData.text)),
        dataType: "json",
        success: function (data) {
            wxInit = data
        },
        timeout: 3000,
        complete: function (XMLHttpRequest, status) {
            if (status == 'timeout') wxInit_a(request);
        }
    })
}
/**
 *初始化联系人
 * @param request
 */
function Contact_a(request) {
    $.ajax({
        url: request.Contact.url,
        type: 'GET',
        contentType: 'application/json;charset=UTF-8',
        dataType: "json",
        success: function (data) {
            if (data.MemberCount == 0) Contact_a(request);
            Contact = data
        },
        timeout: 4000,
        complete: function (XMLHttpRequest, status) {
            if (status == 'timeout') Contact_a(request);
        }
    })
}
/**
 *初始化联系人群
 * @param request
 */
function webwxbatchgetcontact_a(request) {
    $.ajax({
        url: request.webwxbatchgetcontact.url + "&me=me",//避开循环标志
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(JSON.parse(request.webwxbatchgetcontact.postData.text)),
        dataType: "json",
        success: function (data) {
            if (data.Count == 0) webwxbatchgetcontact_a(request);
            webwxbatchgetcontact = data
        },
        timeout: 3000,
        complete: function (XMLHttpRequest, status) {
            if (status == 'timeout') webwxbatchgetcontact_a(request);
        }
    })
}


/**
 * 用来保持在线
 *
 */
var click=0;
function timedCount01() {
    setTimeout("timedCount01()", 10000)
    if (!wxInit || !BaseRequest)  return;
    //模拟点击
    if(click==0) {
        click=1;
        $('.web_wechat_tab_chat').click()
    }else {
        click=0;
        $('.web_wechat_tab_friends').click()
    }
    console.log("保持在线")
    Msg.Content = "保持在线:" + new Date();
    Msg.ToUserName = "filehelper";
    Msg.FromUserName = wxInit.User.UserName;
    webwxsendmsg(BaseRequest, Msg)
}
timedCount01()

function timedCount02() {
    location.reload();
}
setTimeout("timedCount02()", 10000000)




//获取联系人
// if (request.url.indexOf("wx2.qq.com/cgi-bin/mmwebwx-bin/webwxgetcontact") >= 0) {
//     //BaseRequest=request.params;
//     Contact = request.content;
// }











